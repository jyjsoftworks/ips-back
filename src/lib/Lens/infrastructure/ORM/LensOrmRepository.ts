// src/lib/Lens/infrastructure/ORM/LensOrmRepository.ts
import { LensRepository } from "../../domain/LensRepository";
import { Lens } from "../../domain/Lens";
import { UpdateLensRequestDto } from "../../application/Dto/UpdateLensRequestDto";

import { LensModel } from "./LensModel";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";

export class LensOrmRepository implements LensRepository {
  async getAllLens(): Promise<Lens[]> {
    const rows = await LensModel.findAll();
    return rows.map((row) => this.mapToDomain(row));
  }

  async getById(id: number): Promise<Lens | null> {
    const row = await LensModel.findByPk(id);
    return row ? this.mapToDomain(row) : null;
  }

  async createLens(lens: Lens): Promise<void> {
    await LensModel.create(lens.mapToPrimitives());
  }

  async update(id: number, dto: UpdateLensRequestDto): Promise<void> {
    const existing = await LensModel.findByPk(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El lente con id ${id} no existe`
      );
    }

    const dataToUpdate: any = {};

    if (dto.type !== undefined) dataToUpdate.type = dto.type;
    if (dto.frameId !== undefined) dataToUpdate.frameId = dto.frameId;
    if (dto.glassId !== undefined) dataToUpdate.glassId = dto.glassId;
    if (dto.leftSphere !== undefined) dataToUpdate.leftSphere = dto.leftSphere;
    if (dto.rightSphere !== undefined) dataToUpdate.rightSphere = dto.rightSphere;
    if (dto.leftCylinder !== undefined) dataToUpdate.leftCylinder = dto.leftCylinder;
    if (dto.rightCylinder !== undefined) dataToUpdate.rightCylinder = dto.rightCylinder;
    if (dto.leftAxis !== undefined) dataToUpdate.leftAxis = dto.leftAxis;
    if (dto.rightAxis !== undefined) dataToUpdate.rightAxis = dto.rightAxis;
    if (dto.leftAddition !== undefined) dataToUpdate.leftAddition = dto.leftAddition;
    if (dto.rightAddition !== undefined) dataToUpdate.rightAddition = dto.rightAddition;
    if (dto.subtotal !== undefined) dataToUpdate.subtotal = dto.subtotal;

    await LensModel.update(dataToUpdate, { where: { id } });
  }

  private mapToDomain(model: LensModel): Lens {
    return new Lens({
      id: model.id,
      type: model.type,
      frameId: model.frameId,
      glassId: model.glassId,
      leftSphere: model.leftSphere,
      rightSphere: model.rightSphere,
      leftCylinder: model.leftCylinder,
      rightCylinder: model.rightCylinder,
      leftAxis: model.leftAxis,
      rightAxis: model.rightAxis,
      leftAddition: model.leftAddition,
      rightAddition: model.rightAddition,
      subtotal: model.subtotal,
    });
  }
}
