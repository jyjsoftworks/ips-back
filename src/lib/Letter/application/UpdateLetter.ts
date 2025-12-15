import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { LetterRepository } from "../domain/LetterRepository";
import { PatientRepository } from "../../Patient/domain/PatientRepository";
import { DoctorRepository } from "../../Doctor/domain/DoctorRepository";
import { SellerRepository } from "../../Seller/domain/SellerRepository";

import { UpdateLetterRequestDto } from "./Dto/UpdateLetterRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class UpdateLetter {
  constructor(
    private letterRepository: LetterRepository,
    private patientRepository: PatientRepository,
    private doctorRepository: DoctorRepository,
    private sellerRepository: SellerRepository
  ) {}

  async run(id: number, dto: UpdateLetterRequestDto): Promise<void> {
    const updateDto = plainToInstance(UpdateLetterRequestDto, dto);

    if (
      updateDto.idPatient === undefined &&
      updateDto.idDoctor === undefined &&
      updateDto.idSeller === undefined
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

    const existing = await this.letterRepository.getById(id);
    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El sobre con id ${id} no existe`
      );
    }

    // Validar FKs solo si vienen en el DTO
    if (updateDto.idPatient !== undefined) {
      const patient = await this.patientRepository.getById(updateDto.idPatient);
      if (!patient) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El paciente con id ${updateDto.idPatient} no existe`
        );
      }
    }

    if (updateDto.idDoctor !== undefined) {
      const doctor = await this.doctorRepository.getById(updateDto.idDoctor);
      if (!doctor) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El doctor con id ${updateDto.idDoctor} no existe`
        );
      }
    }

    if (updateDto.idSeller !== undefined) {
      const seller = await this.sellerRepository.getById(updateDto.idSeller);
      if (!seller) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El vendedor con id ${updateDto.idSeller} no existe`
        );
      }
    }

    await this.letterRepository.update(id, updateDto);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
