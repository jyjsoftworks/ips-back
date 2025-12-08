import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { DoctorRepository } from "../domain/DoctorRepository";
import { Doctor } from "../domain/Doctor";
import { CreateDoctorRequestDto } from "./Dto/CreateDoctorRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class CreateDoctor {
  constructor(private doctorRepository: DoctorRepository) {}

  async run(dto: CreateDoctorRequestDto): Promise<void> {
    const createDto = plainToInstance(CreateDoctorRequestDto, dto);

    await validateOrReject(createDto).catch((errors: ValidationError[]) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const existing = await this.doctorRepository.getByMatriculas(
      dto.mat_nac,
      dto.mat_prov
    );

    if (existing) {
      throw new GlobalAppException(
        400,
        "4000",
        errorMessages["4000"],
        "Ya existe un doctor con esas matrículas."
      );
    }

    const doctor = new Doctor({
      firstName: dto.firstName,
      lastName: dto.lastName,
      mat_nac: dto.mat_nac,
      mat_prov: dto.mat_prov,
      active: true,
    });

    await this.doctorRepository.createDoctor(doctor);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
