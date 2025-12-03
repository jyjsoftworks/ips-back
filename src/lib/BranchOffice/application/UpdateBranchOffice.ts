import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { BranchOfficeRepository } from "../domain/BranchOfficeRepository";
import { UpdateBranchOfficeRequestDto } from "./Dto/UpdateBranchOfficeRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class UpdateBranchOffice {
  constructor(private branchOfficeRepository: BranchOfficeRepository) {}

  async run(id: number, dto: UpdateBranchOfficeRequestDto): Promise<void> {
    const updateDto = plainToInstance(UpdateBranchOfficeRequestDto, dto);

    if (updateDto.name === undefined && updateDto.address === undefined) {
      throw new GlobalAppException(
        400,
        "4002",
        "Nada para actualizar",
        "Debe enviar al menos un campo para modificar."
      );
    }

    await validateOrReject(updateDto).catch((errors: ValidationError[]) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const existing = await this.branchOfficeRepository.getById(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `La sucursal con id ${id} no existe`
      );
    }

    if (updateDto.name) {
      const other = await this.branchOfficeRepository.getByName(updateDto.name);
      if (other && other.id !== id) {
        throw new GlobalAppException(
          400,
          "4000",
          errorMessages["4000"],
          "Ya existe otra sucursal con ese nombre."
        );
      }
    }

    await this.branchOfficeRepository.update(id, updateDto);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
