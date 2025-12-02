import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { TreatmentRepository } from "../domain/TreatmentRepository";
import { Treatment } from "../domain/Treatment";
import { CreateTreatmentRequestDto } from "./Dto/CreateTreatmentRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class CreateTreatment {
  constructor(private treatmentRepository: TreatmentRepository) {}

  async run(dto: CreateTreatmentRequestDto): Promise<void> {
    const treatmentDto = plainToInstance(CreateTreatmentRequestDto, dto);

    await validateOrReject(treatmentDto).catch((errors) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const existing = await this.treatmentRepository.getByName(dto.name);

    if (existing) {
      throw new GlobalAppException(
        400,
        "4000",
        errorMessages["4000"],
        "El tratamiento ya existe."
      );
    }

    const treatment = new Treatment({
      name: dto.name,
      sphereLimit: dto.sphereLimit,
      cylinderLimit: dto.cylinderLimit,
      leadTimeDays: dto.leadTimeDays,
      price: dto.price,
      commission: dto.commission,
      commissionPercentage: dto.commissionPercentage,
      active: true,
    });

    await this.treatmentRepository.createTreatment(treatment);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
