import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { PatientRepository } from "../domain/PatientRepository";
import { UpdatePatientRequestDto } from "./Dto/UpdatePatientRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class UpdatePatient {
  constructor(private patientRepository: PatientRepository) {}

  async run(id: number, dto: UpdatePatientRequestDto): Promise<void> {
    const updateDto = plainToInstance(UpdatePatientRequestDto, dto);

    if (
      updateDto.firstName === undefined &&
      updateDto.lastName === undefined &&
      updateDto.dni === undefined &&
      updateDto.phone === undefined &&
      updateDto.observation === undefined
    ) {
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

    const existing = await this.patientRepository.getById(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El paciente con id ${id} no existe`
      );
    }

    // Si cambia el DNI, controlamos duplicado
    if (updateDto.dni) {
      const other = await this.patientRepository.getByDni(updateDto.dni);
      if (other && other.id !== id) {
        throw new GlobalAppException(
          400,
          "4000",
          errorMessages["4000"],
          "Ya existe otro paciente con ese DNI."
        );
      }
    }

    await this.patientRepository.update(id, updateDto);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
