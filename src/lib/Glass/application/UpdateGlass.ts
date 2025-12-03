// application/UpdateGlass.ts
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { GlassRepository } from "../domain/GlassRepository";
import { CategoryRepository } from "../../Category/domain/CategoryRepository";
import { MaterialRepository } from "../../Material/domain/MaterialRepository";
import { TreatmentRepository } from "../../Treatment/domain/TreatmentRepository";

import { UpdateGlassRequestDto } from "./Dto/UpdateGlassRequestDto";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class UpdateGlass {
  constructor(
    private glassRepository: GlassRepository,
    private categoryRepository: CategoryRepository,
    private materialRepository: MaterialRepository,
    private treatmentRepository: TreatmentRepository
  ) {}

  async run(id: number, dto: UpdateGlassRequestDto): Promise<void> {
    const updateDto = plainToInstance(UpdateGlassRequestDto, dto);

    if (
      updateDto.idCategory === undefined &&
      updateDto.idMaterial === undefined &&
      updateDto.idTreatment === undefined
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

    const existing = await this.glassRepository.getById(id);
    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El cristal (glass) con id ${id} no existe`
      );
    }

    // Validar FKs solo si vienen en el DTO
    if (updateDto.idCategory !== undefined) {
      const category = await this.categoryRepository.getById(updateDto.idCategory);
      if (!category) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `La categoría con id ${updateDto.idCategory} no existe`
        );
      }
    }

    if (updateDto.idMaterial !== undefined) {
      const material = await this.materialRepository.getById(updateDto.idMaterial);
      if (!material) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El material con id ${updateDto.idMaterial} no existe`
        );
      }
    }

    if (updateDto.idTreatment !== undefined) {
      const treatment = await this.treatmentRepository.getById(updateDto.idTreatment);
      if (!treatment) {
        throw new GlobalAppException(
          404,
          "2007",
          errorMessages["2007"],
          `El tratamiento con id ${updateDto.idTreatment} no existe`
        );
      }
    }

    await this.glassRepository.update(id, updateDto);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
