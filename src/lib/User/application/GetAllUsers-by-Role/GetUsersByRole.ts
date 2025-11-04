import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import { UserRepository } from "../../domain/UserRepository";
import { RoleRepository } from "../../../Role/domain/RoleRepository";
import { UserGeneralResponseDto } from "../dto/response/UserGeneralResponseDto";
import errorMessages from "../../../../message";


export class GetUsersByRole {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository
  ) {}

  async run(roleName: string): Promise<UserGeneralResponseDto[]> {
    const roleId = await this.roleRepository.getByName(roleName);
    if (!roleId) {
      throw new GlobalAppException(
        404,
        '4004',
        'Rol no encontrado',
        `No existe un rol con el nombre ${roleName}`
      );
    }

    const users = await this.userRepository.getUsersByRoleId(roleId);

    if (!users.length) {
      throw new GlobalAppException(
        204,
        '2006',
        errorMessages['2006'],
        'No se encontraron usuarios con ese rol'
      );
    }

    const userDto = users.map(user => ({
      id:user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      active: user.active,
      confirmed: user.confirmed,
      lastLogin: user.lastLogin,
      roles: user.roles?.map(role => ({
        id: role.id,
        name: role.name
      })) || []
    }));

    return userDto;
  }
}
