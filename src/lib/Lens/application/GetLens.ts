import { LensRepository } from "../domain/LensRepository";
import { LensResponseDto } from "./Dto/LensResponseDto";
import { LensFrameRepository } from "../../LensFrame/domain/LensFrameRepository";
import { GlassRepository } from "../../Glass/domain/GlassRepository";
import { CategoryRepository } from "../../Category/domain/CategoryRepository";
import { MaterialRepository } from "../../Material/domain/MaterialRepository";
import { TreatmentRepository } from "../../Treatment/domain/TreatmentRepository";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";

export class GetLens {
  constructor(
    private lensRepository: LensRepository,
    private lensFrameRepository: LensFrameRepository,
    private glassRepository: GlassRepository,
    private categoryRepository: CategoryRepository,
    private materialRepository: MaterialRepository,
    private treatmentRepository: TreatmentRepository
  ) {}

  async run(): Promise<LensResponseDto[]> {
    try {
      const lenses = await this.lensRepository.getAllLens();

      if (!lenses.length) {
        throw new GlobalAppException(
          204,
          "2006",
          errorMessages["2006"],
          "No se encontraron lentes"
        );
      }

      const result: LensResponseDto[] = [];

      for (const lens of lenses) {
        const [frame, glass] = await Promise.all([
          this.lensFrameRepository.getById(lens.frameId),
          this.glassRepository.getById(lens.glassId),
        ]);

        let glassNode: LensResponseDto["glass"] = null;

        if (glass) {
          const [category, material, treatment] = await Promise.all([
            this.categoryRepository.getById(glass.idCategory),
            this.materialRepository.getById(glass.idMaterial),
            this.treatmentRepository.getById(glass.idTreatment),
          ]);

          glassNode = {
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
                  id: treatment.id!,
                  name: treatment.name,
                  sphereLimit: treatment.sphereLimit,
                  cylinderLimit: treatment.cylinderLimit,
                  leadTimeDays: treatment.leadTimeDays,
                  price: treatment.price,
                  commission: treatment.commission,
                  commissionPercentage: treatment.commissionPercentage,
                  active: treatment.active,
                }
              : null,
          };
        }

        result.push(
          new LensResponseDto({
            id: lens.id!,
            type: lens.type,
            frameId: lens.frameId,
            glassId: lens.glassId,
            leftSphere: lens.leftSphere,
            rightSphere: lens.rightSphere,
            leftCylinder: lens.leftCylinder,
            rightCylinder: lens.rightCylinder,
            leftAxis: lens.leftAxis,
            rightAxis: lens.rightAxis,
            leftAddition: lens.leftAddition,
            rightAddition: lens.rightAddition,
            subtotal: lens.subtotal,
            frame: frame
              ? {
                  id: frame.id!,
                  templeNumber: frame.templeNumber,
                  brand: frame.brand,
                  price: frame.price,
                  commission: frame.commission,
                  commissionPercentage: frame.commissionPercentage,
                  active: frame.active,
                }
              : null,
            glass: glassNode,
          })
        );
      }

      return result;
    } catch (error) {
      throw error instanceof GlobalAppException
        ? error
        : new GlobalAppException(
            500,
            "ERROR",
            "LensGetAllService",
            "Error inesperado al obtener lentes."
          );
    }
  }
}
