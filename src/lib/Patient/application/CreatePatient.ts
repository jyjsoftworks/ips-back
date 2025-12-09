import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { PatientRepository } from "../domain/PatientRepository";
import { Patient } from "../domain/Patient";
import { CreatePatientRequestDto } from "./Dto/CreatePatientRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class CreatePatient {
  constructor(private patientRepository: PatientRepository) {}

  async run(dto: CreatePatientRequestDto): Promise<void> {
    const createDto = plainToInstance(CreatePatientRequestDto, dto);

    await validateOrReject(createDto).catch((errors: ValidationError[]) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const existing = await this.patientRepository.getByDni(dto.dni);
    if (existing) {
      throw new GlobalAppException(
        400,
        "4000",
        errorMessages["4000"],
        "Ya existe un paciente con ese DNI."
      );
    }

    const patient = new Patient({
      firstName: dto.firstName,
      lastName: dto.lastName,
      dni: dto.dni,
      phone: dto.phone,
      observation: dto.observation ?? "",
      active: true,
    });

    await this.patientRepository.createPatient(patient);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
