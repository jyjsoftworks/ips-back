import { GlassRepository } from "../domain/GlassRepository";
import { CategoryRepository } from "../../Category/domain/CategoryRepository";
import { MaterialRepository } from "../../Material/domain/MaterialRepository";
import { TreatmentRepository } from "../../Treatment/domain/TreatmentRepository";

import { GlassResponseDto } from "./Dto/GlassResponseDto";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetGlassById {
  constructor(
    private glassRepository: GlassRepository,
    private categoryRepository: CategoryRepository,
    private materialRepository: MaterialRepository,
    private treatmentRepository: TreatmentRepository
  ) {}

  async run(id: number): Promise<GlassResponseDto> {
    const glass = await this.glassRepository.getById(id);

    if (!glass) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El cristal con id ${id} no existe`
      );
    }

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

    return dto;
  }
}
