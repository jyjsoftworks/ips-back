import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { DoctorRepository } from "../domain/DoctorRepository";
import { UpdateDoctorRequestDto } from "./Dto/UpdateDoctorRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class UpdateDoctor {
  constructor(private doctorRepository: DoctorRepository) {}

  async run(id: number, dto: UpdateDoctorRequestDto): Promise<void> {
    const updateDto = plainToInstance(UpdateDoctorRequestDto, dto);

    if (
      updateDto.firstName === undefined &&
      updateDto.lastName === undefined &&
      updateDto.mat_nac === undefined &&
      updateDto.mat_prov === undefined
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

    const existing = await this.doctorRepository.getById(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El doctor con id ${id} no existe`
      );
    }

    if (updateDto.mat_nac || updateDto.mat_prov) {
      const mat_nac = updateDto.mat_nac ?? existing.mat_nac;
      const mat_prov = updateDto.mat_prov ?? existing.mat_prov;

      const other = await this.doctorRepository.getByMatriculas(
        mat_nac,
        mat_prov
      );

      if (other && other.id !== id) {
        throw new GlobalAppException(
          400,
          "4000",
          errorMessages["4000"],
          "Ya existe otro doctor con esas matrículas."
        );
      }
    }

    await this.doctorRepository.update(id, updateDto);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
