import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { GlassRepository } from "../domain/GlassRepository";
import { CategoryRepository } from "../../Category/domain/CategoryRepository";
import { MaterialRepository } from "../../Material/domain/MaterialRepository";
import { TreatmentRepository } from "../../Treatment/domain/TreatmentRepository";

import { CreateGlassRequestDto } from "./Dto/CreateGlassRequestDto";
import { Glass } from "../domain/Glass";

import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class CreateGlass {
  constructor(
    private glassRepository: GlassRepository,
    private categoryRepository: CategoryRepository,
    private materialRepository: MaterialRepository,
    private treatmentRepository: TreatmentRepository
  ) {}

  async run(dto: CreateGlassRequestDto): Promise<void> {
    const glassDto = plainToInstance(CreateGlassRequestDto, dto);

    await validateOrReject(glassDto).catch((errors: ValidationError[]) => {
      throw new GlobalAppException(
        400,
        "4001",
        "Errores de validación",
        this.formatErrors(errors)
      );
    });

    // Validar FKs
    const [category, material, treatment] = await Promise.all([
      this.categoryRepository.getById(dto.idCategory),
      this.materialRepository.getById(dto.idMaterial),
      this.treatmentRepository.getById(dto.idTreatment),
    ]);

    if (!category) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `La categoría con id ${dto.idCategory} no existe`
      );
    }

    if (!material) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El material con id ${dto.idMaterial} no existe`
      );
    }

    if (!treatment) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El tratamiento con id ${dto.idTreatment} no existe`
      );
    }

    const glass = new Glass({
      idCategory: dto.idCategory,
      idMaterial: dto.idMaterial,
      idTreatment: dto.idTreatment,
      active:true,
    });

    await this.glassRepository.createGlass(glass);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => Object.values(error.constraints ?? {}));
  }
}
