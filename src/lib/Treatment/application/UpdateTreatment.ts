import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { TreatmentRepository } from "../domain/TreatmentRepository";
import { UpdateTreatmentRequestDto } from "./Dto/UpdateTreatmentRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class UpdateTreatment {
  constructor(private treatmentRepository: TreatmentRepository) {}

  async run(id: number, dto: UpdateTreatmentRequestDto): Promise<void> {
    const updateDto = plainToInstance(UpdateTreatmentRequestDto, dto);

    if (
      updateDto.name === undefined &&
      updateDto.sphereLimit === undefined &&
      updateDto.cylinderLimit === undefined &&
      updateDto.leadTimeDays === undefined &&
      updateDto.price === undefined &&
      updateDto.commission === undefined &&
      updateDto.commissionPercentage === undefined
    ) {
      throw new GlobalAppException(
        400,
        "4002",
        "Nada para actualizar",
        "Debe enviar al menos un campo para modificar."
      );
    }

    await validateOrReject(updateDto).catch((errors) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const existing = await this.treatmentRepository.getById(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El tratamiento con id ${id} no existe.`
      );
    }

    if (updateDto.name) {
      const other = await this.treatmentRepository.getByName(updateDto.name);
      if (other && other.id !== id) {
        throw new GlobalAppException(
          400,
          "4000",
          errorMessages["4000"],
          "Ya existe otro tratamiento con ese nombre."
        );
      }
    }

    await this.treatmentRepository.update(id, updateDto);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
