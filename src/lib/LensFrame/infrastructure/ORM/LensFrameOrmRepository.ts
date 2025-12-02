import { Op } from "sequelize";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";

import { LensFrameRepository } from "../../domain/LensFrameRepository";
import { LensFrame } from "../../domain/LensFrame";
import { CreateLensFrameRequestDto } from "../../application/Dto/CreateLensFrameRequestDto";
import { LensFrameModel } from "./LensFrameModel";
import { UpdateLensFrameRequestDto } from "../../application/Dto/UpdateLensFrameRequestDto";

export class LensFrameORMRepository implements LensFrameRepository {


  async getAllLensFrame(): Promise<LensFrame[]> {
    const rows = await LensFrameModel.findAll();
    return rows.map(row => this.mapToDomain(row));
  }

  async getByTempleNumber(templeNumber: string): Promise<LensFrame | null> {
    const row = await LensFrameModel.findOne({
      where: { templeNumber },
    });

    return row ? this.mapToDomain(row) : null;
  }

  async createLensFrame(lensFrame: LensFrame): Promise<void> {
    await LensFrameModel.create(lensFrame.mapToPrimitives());
  }

  async getById(id: number): Promise<LensFrame | null> {
    const row = await LensFrameModel.findByPk(id);
    return row ? this.mapToDomain(row) : null;
  }

  async update(id: number, dto: UpdateLensFrameRequestDto): Promise<void> {
    const existing = await LensFrameModel.findByPk(id);
    if (!existing) {
      throw new GlobalAppException(
        404,
        "4041",
        errorMessages["4041"],
        `El armazón con id ${id} no existe.`
      );
    }

    if (dto.templeNumber) {
      const duplicate = await LensFrameModel.findOne({
        where: {
          templeNumber: dto.templeNumber,
          id: { [Op.ne]: id },
        },
      });

      if (duplicate) {
        throw new GlobalAppException(
          400,
          "4000",
          errorMessages["4000"],
          "Ya existe otro armazón con ese número de patilla."
        );
      }
    }

    const dataToUpdate: any = {};
    if (dto.templeNumber !== undefined) dataToUpdate.templeNumber = dto.templeNumber;
    if (dto.brand !== undefined) dataToUpdate.brand = dto.brand;
    if (dto.price !== undefined) dataToUpdate.price = dto.price;
    if (dto.commission !== undefined) dataToUpdate.commission = dto.commission;
    if (dto.commissionPercentage !== undefined) {
        dataToUpdate.commissionPercentage = dto.commissionPercentage;
    }

    await LensFrameModel.update(dataToUpdate, { where: { id } });
    }


  private mapToDomain(lensFrameModel: LensFrameModel): LensFrame {
    return new LensFrame({
      id: lensFrameModel.id,
      templeNumber: lensFrameModel.templeNumber,
      brand: lensFrameModel.brand,
      price: lensFrameModel.price,
      commission: lensFrameModel.commission,
      commissionPercentage: lensFrameModel.commissionPercentage,
      active: lensFrameModel.active,
    });
  }
}
