import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";

import { GlassRepository } from "../../domain/GlassRepository";
import { Glass } from "../../domain/Glass";
import { UpdateGlassRequestDto } from "../../application/Dto/UpdateGlassRequestDto";
import { GlassModel } from "./GlassModel";

export class GlassOrmRepository implements GlassRepository {
    
  async getAll(): Promise<Glass[]> {
    const rows = await GlassModel.findAll();
    return rows.map((row) => this.mapToDomain(row));
  }

  async getById(id: number): Promise<Glass | null> {
    const row = await GlassModel.findByPk(id);
    return row ? this.mapToDomain(row) : null;
  }

  async createGlass(glass: Glass): Promise<void> {
    await GlassModel.create({
      idCategory: glass.idCategory,
      idMaterial: glass.idMaterial,
      idTreatment: glass.idTreatment,
      active: glass.active,
    });
  }

  async update(id: number, dto: UpdateGlassRequestDto): Promise<void> {
    const existing = await GlassModel.findByPk(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El cristal (glass) con id ${id} no existe.`
      );
    }

    const dataToUpdate: any = {};

    if (dto.idCategory !== undefined) {
      dataToUpdate.idCategory = dto.idCategory;
    }
    if (dto.idMaterial !== undefined) {
      dataToUpdate.idMaterial = dto.idMaterial;
    }
    if (dto.idTreatment !== undefined) {
      dataToUpdate.idTreatment = dto.idTreatment;
    }

    await GlassModel.update(dataToUpdate, { where: { id } });
  }

  private mapToDomain(glassModel: GlassModel): Glass {
    return new Glass({
      id: glassModel.id,
      idCategory: glassModel.idCategory,
      idMaterial: glassModel.idMaterial,
      idTreatment: glassModel.idTreatment,
      active: glassModel.active,
    });
  }
}
