import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import { UserRepository } from "../../domain/UserRepository";
import { UserUpdateRequestDto } from "../dto/request/UserUpdateRequestDto";
import { plainToInstance } from "class-transformer";
import errorMessages from "../../../../message";
import { validateOrReject, ValidationError } from "class-validator";

export class UpdateUser {
  constructor(private repository: UserRepository) {}

  async run(id: number, dto: UserUpdateRequestDto) {    
    
    const userDto = plainToInstance(UserUpdateRequestDto, dto);    
    await validateOrReject(userDto).catch((errors) => {
      throw new GlobalAppException(
        400,
        "4012",
        "Error de validación",
        this.formatError(errors)
      );
    });

    const existingUser = await this.repository.getUserById(id);
    if (!existingUser) {
      throw new GlobalAppException(
        404,
        "4041",
        errorMessages["4041"],
        "El usuario con el Id especificado no existe"
      );
    }

    await this.repository.updateUser(id, userDto);
  }

  private formatError(errors: ValidationError | ValidationError[]): string[] {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }

    return errors.flatMap((error) => Object.values(error.constraints || {}));
  }
}
