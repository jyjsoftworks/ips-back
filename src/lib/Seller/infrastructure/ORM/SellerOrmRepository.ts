import { SellerRepository } from "../../domain/SellerRepository";
import { Seller } from "../../domain/Seller";
import { UpdateSellerRequestDto } from "../../application/Dto/UpdateSellerRequestDto";

import { SellerModel } from "./SellerModel";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";

export class SellerOrmRepository implements SellerRepository {
  async getAll(): Promise<Seller[]> {
    const rows = await SellerModel.findAll();
    return rows.map((row) => this.mapToDomain(row));
  }


    async getByUserAndBranch(idUser: number, idBranchOffice: number): Promise<Seller | null> {
    const row = await SellerModel.findOne({
      where: {
        idUser,
        idBranchOffice,
      },
    });

    return row ? this.mapToDomain(row) : null;
  }

  async getById(id: number): Promise<Seller | null> {
    const row = await SellerModel.findByPk(id);
    return row ? this.mapToDomain(row) : null;
  }

  async createSeller(seller: Seller): Promise<void> {
    await SellerModel.create({
      idUser: seller.idUser,
      idBranchOffice: seller.idBranchOffice,
      active: seller.active,
    });
  }

  async update(id: number, dto: UpdateSellerRequestDto): Promise<void> {
    const existing = await SellerModel.findByPk(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El vendedor con id ${id} no existe`
      );
    }

    const dataToUpdate: any = {};

    if (dto.idUser !== undefined) {
      dataToUpdate.idUser = dto.idUser;
    }
    if (dto.idBranchOffice !== undefined) {
      dataToUpdate.idBranchOffice = dto.idBranchOffice;
    }

    await SellerModel.update(dataToUpdate, { where: { id } });
  }

  private mapToDomain(model: SellerModel): Seller {
    return new Seller({
      id: model.id,
      idUser: model.idUser,
      idBranchOffice: model.idBranchOffice,
      active: model.active,
    });
  }
}
