import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

import { LensFrameRepository } from "../domain/LensFrameRepository";
import { CreateLensFrameRequestDto } from "./Dto/CreateLensFrameRequestDto";
import { LensFrame } from "../domain/LensFrame";

export class CreateLensFrame {
  constructor(private lensFrameRepository: LensFrameRepository) {}

  async run(dto: CreateLensFrameRequestDto): Promise<void> {
    const lensFrameDto = plainToInstance(CreateLensFrameRequestDto, dto);

    await validateOrReject(lensFrameDto).catch((errors) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const lensFrame = new LensFrame({
      templeNumber: dto.templeNumber,
      brand: dto.brand,
      price: dto.price,
      commission: dto.commission,
      commissionPercentage: dto.commissionPercentage,
      active: true,
    });

    const existingLensFrame =
      await this.lensFrameRepository.getByTempleNumber(dto.templeNumber);

    if (existingLensFrame == null) {
      await this.lensFrameRepository.createLensFrame(lensFrame);
    } else {
      throw new GlobalAppException(
        400, // Status HTTP
        "4000", // Código de error
        errorMessages["4000"], // Mensaje técnico
        "El armazón ya existe." // Mensaje para el usuario
      );
    }
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
