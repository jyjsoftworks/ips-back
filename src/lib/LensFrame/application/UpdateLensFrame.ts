import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";
import { LensFrameRepository } from "../domain/LensFrameRepository";
import { UpdateLensFrameRequestDto } from "./Dto/UpdateLensFrameRequestDto";

export class UpdateLensFrame {
  constructor(private lensFrameRepository: LensFrameRepository) {}

  async run(id: number, dto: UpdateLensFrameRequestDto): Promise<void> {
    const updateDto = plainToInstance(UpdateLensFrameRequestDto, dto);

    if (
      updateDto.templeNumber === undefined &&
      updateDto.brand === undefined &&
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

    const existing = await this.lensFrameRepository.getById(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El LensFrame con id ${id} no existe.`
      );
    }

    if (updateDto.templeNumber) {
      const other = await this.lensFrameRepository.getByTempleNumber(
        updateDto.templeNumber
      );
      if (other && other.id !== id) {
        throw new GlobalAppException(
          400,
          "4000",
          errorMessages["4000"],
          "Ya existe otro LensFrame con ese número de patilla."
        );
      }
    }

    await this.lensFrameRepository.update(id, updateDto);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
