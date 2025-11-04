import { validateOrReject, ValidationError } from "class-validator";
import { RoleRepository } from "../../domain/RoleRepository";
import { RoleCreateRequestDTO } from "../dto/request/RoleCreateRequestDTO";
import { plainToInstance } from "class-transformer";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";

export class CreateRole {
  constructor(private repository: RoleRepository) {}

  async run(dto: RoleCreateRequestDTO) {
    const roleDto = plainToInstance(RoleCreateRequestDTO, dto);
    await validateOrReject(roleDto).catch((errors) => {
      throw new GlobalAppException(
        400,    
        "4012",
        "Error de validaciòn",
        this.formatError(errors)
      );
    })
    const newRole= await this.repository.createRole(roleDto)
    return newRole
  }
  

  private formatError(errors: ValidationError | ValidationError[]): string[] {
    if (!Array.isArray(errors)) {
      errors = [errors];
    }
    return errors.flatMap((error) => Object.values(error.constraints || {}));
  }
}
