import { BranchOfficeRepository } from "../../domain/BranchOfficeRepository";
import { BranchOffice } from "../../domain/BranchOffice";
import { UpdateBranchOfficeRequestDto } from "../../application/Dto/UpdateBranchOfficeRequestDto";

import { BranchOfficeModel } from "./BranchOfficeModel";

import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";
import { Op } from "sequelize";

export class BranchOfficeOrmRepository implements BranchOfficeRepository {
  async getAllBranchOffice(): Promise<BranchOffice[]> {
    const rows = await BranchOfficeModel.findAll();
    return rows.map((row) => this.mapToDomain(row));
  }

  async getById(id: number): Promise<BranchOffice | null> {
    const row = await BranchOfficeModel.findByPk(id);
    return row ? this.mapToDomain(row) : null;
  }

  async getByName(name: string): Promise<BranchOffice | null> {
    const row = await BranchOfficeModel.findOne({ where: { name } });
    return row ? this.mapToDomain(row) : null;
  }

  async createBranchOffice(branchOffice: BranchOffice): Promise<void> {
    await BranchOfficeModel.create({
      name: branchOffice.name,
      address: branchOffice.address,
      active: branchOffice.active,
    });
  }

  async update(id: number, dto: UpdateBranchOfficeRequestDto): Promise<void> {
    const existing = await BranchOfficeModel.findByPk(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `La sucursal con id ${id} no existe`
      );
    }

    if (dto.name) {
      const duplicate = await BranchOfficeModel.findOne({
        where: {
          name: dto.name,
          id: { [Op.ne]: id },
        },
      });

      if (duplicate) {
        throw new GlobalAppException(
          400,
          "4000",
          errorMessages["4000"],
          "Ya existe otra sucursal con ese nombre."
        );
      }
    }

    const dataToUpdate: any = {};
    
    if (dto.name !== undefined) dataToUpdate.name = dto.name;
    if (dto.address !== undefined) dataToUpdate.address = dto.address;

    await BranchOfficeModel.update(dataToUpdate, { where: { id } });
  }

  private mapToDomain(model: BranchOfficeModel): BranchOffice {
    return new BranchOffice({
      id: model.id,
      name: model.name,
      address: model.address,
      active: model.active,
    });
  }
}
