import { Op } from "sequelize";
import errorMessages from "../../../../message";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import { UserUpdateRequestDto } from "../../application/dto/request/UserUpdateRequestDto";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserModel } from "./UserModel";
import { LoginUserRequestDto } from "../../application/dto/request/LoginUserRequestDto";
import { QueryTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { sequelize } from "../../../Shared/Infrastructure/config/sequelize";
import { Transaction } from "sequelize";
import { RoleModel } from "../../../Role/infrastructure/ORM/RoleModel";
import { Role } from "../../../Role/domain/Role";

export class UserORMRepository implements UserRepository {
  async getAllUsers(): Promise<User[]> {
    const user = await UserModel.findAll();
    return user.map((user) => this.mapToDomain(user));
  }

  async assignRole(
    userId: number,
    roleId: number,
    transaction: Transaction
  ): Promise<void> {
    const user = await UserModel.findByPk(userId, { transaction });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    await user.addRole(roleId, { transaction });
  }


  async getActiveUsers(): Promise<User[]> {
    const user = await UserModel.findAll({
      where: { active: true },
      include: [
        { model: RoleModel, as: "roles" },
      ],
    });
    return user.map((user) => this.mapToDomain(user));
  }
  async getUserById(id: number): Promise<User | null> {
    const user = await UserModel.findByPk(id);
    return user ? this.mapToDomain(user) : null;
  }

  async updateUser(id: number, dto: UserUpdateRequestDto) {
    const existingUser = await UserModel.findByPk(id);
    if (!existingUser) {
      throw new GlobalAppException(
        404,
        "4041",
        errorMessages["4041"],
        "No se encontró el usuario"
      );
    }

    const duplicateEmail = await UserModel.findOne({
      where: {
        email: {
          [Op.iLike]: dto.email,
        },
      },
    });

    if (duplicateEmail && duplicateEmail.id !== id) {
      throw new GlobalAppException(
        409,
        "4090",
        errorMessages["4090"],
        "Ya existe un usuario con el mismo e-mail"
      );
    }
    await existingUser.update(dto);
  }

  async create(user: User): Promise<User> {
    const userPrimitive = user.mapToPrimitives();
    const userCreated = await UserModel.create(userPrimitive);
    return this.mapToDomain(userCreated);
  }

  async userDelete(id: number): Promise<void> {
    const user = await UserModel.findByPk(id);
    if (!user) {
      throw new GlobalAppException(
        404,
        "4041",
        errorMessages["4041"],
        "No se encontró el usuario"
      );
    }
    await user.update({ active: false });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({
      where: { email: { [Op.iLike]: email } },
    });
    const userPlainData = user ? user.get({ plain: true }) : null;
    return userPlainData ? this.mapToDomain(userPlainData) : null;
  }

  async login(loginRequest: LoginUserRequestDto): Promise<User | null> {
    const { email, password } = loginRequest;
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new GlobalAppException(
        404,
        "4012",
        errorMessages["4012"] || "Usuario no encontrado",
        `Usuario con el email ${email} no encontrado.`
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new GlobalAppException(
        404,
        "4014",
        errorMessages["4014"] || "Contraseña incorrecta",
        "Contraseña incorrecta."
      );
    }
    return user;
  }

  async getUserRole(userId: number): Promise<string | null> {
    const query = `
          SELECT r.name as role
          FROM roles r
          WHERE r.id = (
            SELECT "roleId"
            FROM user_role
            WHERE "userId" = :userId
            LIMIT 1
          );
        `;

    const result = (await sequelize.query(query, {
      replacements: { userId },
      type: QueryTypes.SELECT,
    })) as { role: string }[];

    if (!result || result.length === 0) {
      console.error(`No se encontró un rol para el userId: ${userId}`);
      return null;
    }
    return result[0].role;
  }



  async getUsersByRoleId(roleId: number): Promise<User[]> {
    const models = await UserModel.findAll({
      include: [
        {
          model: RoleModel,
          as: "roles",
          where: { id: roleId },
          through: { attributes: [] },
          required: true,
        },
      ],
    });

    return models.map((user) => this.mapToDomain(user));
  }

  private mapToDomain(userModel: UserModel): User {
    return new User({
      id: userModel.id,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      email: userModel.email,
      password: userModel.password,
      active: userModel.active,
      tokenActivation: userModel.tokenActivation,
      confirmed: userModel.confirmed,
      tokenRecovery: userModel.tokenRecovery,
      lastLogin: userModel.lastLogin,
      roles: userModel.roles?.map((role) => this.mapToDomainRole(role)) || [],
    });
  }
  private mapToDomainRole(roleModel: RoleModel): Role {
    return new Role({
      name: roleModel.name,
    });
  }
}
