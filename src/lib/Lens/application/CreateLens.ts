// src/lib/Lens/application/CreateLens.ts
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { LensRepository } from "../domain/LensRepository";
import { Lens } from "../domain/Lens";
import { CreateLensRequestDto } from "./Dto/CreateLensRequestDto";
import { LensFrameRepository } from "../../LensFrame/domain/LensFrameRepository";
import { GlassRepository } from "../../Glass/domain/GlassRepository";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class CreateLens {
  constructor(
    private lensRepository: LensRepository,
    private lensFrameRepository: LensFrameRepository,
    private glassRepository: GlassRepository
  ) {}

  async run(dto: CreateLensRequestDto): Promise<void> {
    const createDto = plainToInstance(CreateLensRequestDto, dto);

    await validateOrReject(createDto).catch((errors: ValidationError[]) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    const [frame, glass] = await Promise.all([
      this.lensFrameRepository.getById(dto.frameId),
      this.glassRepository.getById(dto.glassId),
    ]);

    if (!frame) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El armazón (frame) con id ${dto.frameId} no existe`
      );
    }

    if (!glass) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El cristal (glass) con id ${dto.glassId} no existe`
      );
    }

    const lens = new Lens({
      type: dto.type,
      frameId: dto.frameId,
      glassId: dto.glassId,
      leftSphere: dto.leftSphere,
      rightSphere: dto.rightSphere,
      leftCylinder: dto.leftCylinder,
      rightCylinder: dto.rightCylinder,
      leftAxis: dto.leftAxis,
      rightAxis: dto.rightAxis,
      leftAddition: dto.leftAddition,
      rightAddition: dto.rightAddition,
      subtotal: dto.subtotal,
    });

    await this.lensRepository.createLens(lens);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((e) => Object.values(e.constraints ?? {}));
  }
}
