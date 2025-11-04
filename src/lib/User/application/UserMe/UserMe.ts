import { UserRepository } from "../../domain/UserRepository";
import { UserMeDto } from "../dto/response/UserMeDto";
import JwtUtil from "../../../Utils/JwtUtil";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";

export class UserMe {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async run(token: string): Promise<UserMeDto> {
    try {
      // Verificar y decodificar el token
      const decoded = await JwtUtil.verifyToken(token);

      

      if (!decoded) {
        throw new GlobalAppException(
          401,
          "4005",
          errorMessages["4005"] || "Token inválido",
          "El token proporcionado no es válido o ha expirado."
        );
      }

      const userId = decoded.id;

      const [ user, role] = await Promise.all([
        this.userRepository.getUserById(userId),
        this.userRepository.getUserRole(userId),
      ]);

      if (!user) {
        throw new GlobalAppException(
          404,
          "4003",
          errorMessages["4003"] || "Usuario no encontrado",
          "El usuario con el ID especificado no existe."
        );
      }

      if (!role) {
        throw new GlobalAppException(
          404,
          "4004",
          errorMessages["4004"] || "Rol no encontrado",
          "No se pudo encontrar un rol asociado al usuario especificado."
        );
      }

      const name = `${user.firstName} ${user.lastName}`;
      return new UserMeDto(userId, name, role);
      
    } catch (error) {
      if (error instanceof GlobalAppException) {
        throw error; 
      }

      throw new GlobalAppException(
        500,
        "5000",
        errorMessages["5000"] || "Error interno del servidor",
        error.message || "Ocurrió un error inesperado."
      );
    }
  }
}
