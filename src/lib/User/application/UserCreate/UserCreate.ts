import { plainToInstance } from "class-transformer";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { CreateUserRequestDto } from "../dto/request/CreateUserRequestDto";
import { validateOrReject, ValidationError } from "class-validator";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { RoleRepository } from "src/lib/Role/domain/RoleRepository";
import { Sequelize } from "sequelize";

dotenv.config();

export class UserCreate {
  constructor(
    private repository: UserRepository,
    private roleRepository: RoleRepository,
    private sequelize: Sequelize
  ) {}

  async run(dto: CreateUserRequestDto): Promise<User> {
    const transaction = await this.sequelize.transaction();

    try {
      const userDto = plainToInstance(CreateUserRequestDto, dto);
    
      userDto.role = userDto.role.toUpperCase();

      await validateOrReject(userDto).catch((errors) => {
        throw new GlobalAppException(
          400,
          "4000",
          "Errores de validación",
          this.formatErrors(errors)
        );
      });
            
      const roleId = await this.roleRepository.getByName(userDto.role);

      if (!roleId) {
        throw new GlobalAppException(
          400,
          "4041",
          "Rol no encontrado",
          "El rol no fue encontrado o no existe."
        );
      }

      const existingUser = await this.repository.getUserByEmail(userDto.email);
      if (existingUser) {
        throw new GlobalAppException(
          400,
          "4013",
          "El email ya está registrado",
          "El email ya está registrado, por favor intente con otro email."
        );
      }

      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(userDto.password, saltRounds);
      userDto.password = hashedPassword;

      const user = new User({
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
        password: userDto.password,
      });

      const createdUser = await this.repository.create(user, transaction);

      await this.repository.assignRole(createdUser.id, roleId, transaction);

      await transaction.commit();

      return createdUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private formatErrors(errors: ValidationError | ValidationError[]): string[] {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }
    return errors.flatMap((error) => Object.values(error.constraints || {}));
  }
}
