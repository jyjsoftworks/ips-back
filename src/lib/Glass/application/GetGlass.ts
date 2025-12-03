// application/GetGlass.ts
import { GlassRepository } from "../domain/GlassRepository";
import { CategoryRepository } from "../../Category/domain/CategoryRepository";
import { MaterialRepository } from "../../Material/domain/MaterialRepository";
import { TreatmentRepository } from "../../Treatment/domain/TreatmentRepository";

import { GlassResponseDto } from "./Dto/GlassResponseDto";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetGlass {
  constructor(
    private glassRepository: GlassRepository,
    private categoryRepository: CategoryRepository,
    private materialRepository: MaterialRepository,
    private treatmentRepository: TreatmentRepository
  ) {}

  async run(): Promise<GlassResponseDto[]> {
    const glasses = await this.glassRepository.getAll();

    if (!glasses.length) {
      throw new GlobalAppException(
        204,
        "2006",
        errorMessages["2006"],
        "No se encontraron cristales"
      );
    }

    const result: GlassResponseDto[] = [];

    for (const glass of glasses) {
      const [category, material, treatment] = await Promise.all([
        this.categoryRepository.getById(glass.idCategory),
        this.materialRepository.getById(glass.idMaterial),
        this.treatmentRepository.getById(glass.idTreatment),
      ]);

      const dto = new GlassResponseDto({
        id: glass.id!,
        idCategory: glass.idCategory,
        idMaterial: glass.idMaterial,
        idTreatment: glass.idTreatment,
        active: glass.active,
        category: category
          ? { id: category.id!, name: category.name }
          : null,
        material: material
          ? { id: material.id!, name: material.name }
          : null,
        treatment: treatment
          ? {
              id: treatment.id,
              name:treatment.name,
              sphereLimit:treatment.sphereLimit,
              cylinderLimit:treatment.cylinderLimit,
              leadTimeDays:treatment.leadTimeDays,
              price:treatment.price,
              commission:treatment.commission,
              commissionPercentage:treatment.commissionPercentage,
              active: treatment.active 
            }
          : null,
      });

      result.push(dto);
    }

    return result;
  }
}
