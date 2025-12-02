import { Op } from "sequelize";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";

import { TreatmentRepository } from "../../domain/TreatmentRepository";
import { Treatment } from "../../domain/Treatment";
import { UpdateTreatmentRequestDto } from "../../application/Dto/UpdateTreatmentRequestDto";
import { TreatmentModel } from "./TreatmentModel"; 

export class TreatmentOrmRepository implements TreatmentRepository {
  async getByName(name: string): Promise<Treatment | null> {
    const row = await TreatmentModel.findOne({ where: { name } });
    return row ? this.mapToDomain(row) : null;
  }

  async getAllTreatment(): Promise<Treatment[]> {
    const rows = await TreatmentModel.findAll();
    return rows.map(row => this.mapToDomain(row));
  }

  async getById(id: number): Promise<Treatment | null> {
    const row = await TreatmentModel.findByPk(id);
    return row ? this.mapToDomain(row) : null;
  }

  async createTreatment(treatment: Treatment): Promise<void> {
    await TreatmentModel.create({
      name: treatment.name,
      sphereLimit: treatment.sphereLimit,
      cylinderLimit: treatment.cylinderLimit,
      leadTimeDays: treatment.leadTimeDays,
      price: treatment.price,
      commission: treatment.commission,
      commissionPercentage: treatment.commissionPercentage,
      active: treatment.active,
    });
  }

  async update(id: number, dto: UpdateTreatmentRequestDto): Promise<void> {
    const existing = await TreatmentModel.findByPk(id);
    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El tratamiento con id ${id} no existe.`
      );
    }

    if (dto.name) {
      const duplicate = await TreatmentModel.findOne({
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
          "Ya existe otro tratamiento con ese nombre."
        );
      }
    }

    const dataToUpdate: any = {};
    if (dto.name !== undefined) dataToUpdate.name = dto.name;
    if (dto.sphereLimit !== undefined) dataToUpdate.sphereLimit = dto.sphereLimit;
    if (dto.cylinderLimit !== undefined) dataToUpdate.cylinderLimit = dto.cylinderLimit;
    if (dto.leadTimeDays !== undefined) dataToUpdate.leadTimeDays = dto.leadTimeDays;
    if (dto.price !== undefined) dataToUpdate.price = dto.price;
    if (dto.commission !== undefined) dataToUpdate.commission = dto.commission;
    if (dto.commissionPercentage !== undefined) {
      dataToUpdate.commissionPercentage = dto.commissionPercentage;
    }

    await TreatmentModel.update(dataToUpdate, { where: { id } });
  }

  private mapToDomain(treatmentModel: TreatmentModel): Treatment {
    return new Treatment({
      id: treatmentModel.id,
      name: treatmentModel.name,
      sphereLimit: treatmentModel.sphereLimit,
      cylinderLimit: treatmentModel.cylinderLimit,
      leadTimeDays: treatmentModel.leadTimeDays,
      price: treatmentModel.price,
      commission: treatmentModel.commission,
      commissionPercentage: treatmentModel.commissionPercentage,
      active: treatmentModel.active,
    });
  }
}
