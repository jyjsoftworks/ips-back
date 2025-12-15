import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { LensRepository } from "../domain/LensRepository";
import { UpdateLensRequestDto } from "./Dto/UpdateLensRequestDto";
import { LensFrameRepository } from "../../LensFrame/domain/LensFrameRepository";
import { GlassRepository } from "../../Glass/domain/GlassRepository";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class UpdateLens {
  constructor(
    private lensRepository: LensRepository,
    private lensFrameRepository: LensFrameRepository,
    private glassRepository: GlassRepository
  ) {}

  async run(id: number, dto: UpdateLensRequestDto): Promise<void> {
    const updateDto = plainToInstance(UpdateLensRequestDto, dto);

    if (
      updateDto.type === undefined &&
      updateDto.frameId === undefined &&
      updateDto.glassId === undefined &&
      updateDto.leftSphere === undefined &&
      updateDto.rightSphere === undefined &&
      updateDto.leftCylinder === undefined &&
      updateDto.rightCylinder === undefined &&
      updateDto.leftAxis === undefined &&
      updateDto.rightAxis === undefined &&
      updateDto.leftAddition === undefined &&
      updateDto.rightAddition === undefined &&
      updateDto.subtotal === undefined
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

    const existing = await this.lensRepository.getById(id);
    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El lente con id ${id} no existe`
      );
    }

    // validar FKs si cambian
    if (updateDto.frameId !== undefined) {
      const frame = await this.lensFrameRepository.getById(updateDto.frameId);
      if (!frame) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El armazón (frame) con id ${updateDto.frameId} no existe`
        );
      }
    }

    if (updateDto.glassId !== undefined) {
      const glass = await this.glassRepository.getById(updateDto.glassId);
      if (!glass) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El cristal (glass) con id ${updateDto.glassId} no existe`
        );
      }
    }

    await this.lensRepository.update(id, updateDto);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((e) => Object.values(e.constraints ?? {}));
  }
}
