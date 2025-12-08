import { DoctorRepository } from "../../domain/DoctorRepository";
import { Doctor } from "../../domain/Doctor";
import { UpdateDoctorRequestDto } from "../../application/Dto/UpdateDoctorRequestDto";

import { DoctorModel } from "./DoctorModel";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";

export class DoctorOrmRepository implements DoctorRepository {
  async getAllDoctors(): Promise<Doctor[]> {
    const rows = await DoctorModel.findAll();
    return rows.map((row) => this.mapToDomain(row));
  }

  async getById(id: number): Promise<Doctor | null> {
    const row = await DoctorModel.findByPk(id);
    return row ? this.mapToDomain(row) : null;
  }

  async getByMatriculas(mat_nac: string, mat_prov: string): Promise<Doctor | null> {
    const row = await DoctorModel.findOne({
      where: { mat_nac, mat_prov },
    });
    return row ? this.mapToDomain(row) : null;
  }

  async createDoctor(doctor: Doctor): Promise<void> {
    await DoctorModel.create({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      mat_nac: doctor.mat_nac,
      mat_prov: doctor.mat_prov,
      active: doctor.active,
    });
  }

  async update(id: number, dto: UpdateDoctorRequestDto): Promise<void> {
    const existing = await DoctorModel.findByPk(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El doctor con id ${id} no existe`
      );
    }

    const dataToUpdate: any = {};
    if (dto.firstName !== undefined) dataToUpdate.firstName = dto.firstName;
    if (dto.lastName !== undefined) dataToUpdate.lastName = dto.lastName;
    if (dto.mat_nac !== undefined) dataToUpdate.mat_nac = dto.mat_nac;
    if (dto.mat_prov !== undefined) dataToUpdate.mat_prov = dto.mat_prov;

    await DoctorModel.update(dataToUpdate, { where: { id } });
  }

  private mapToDomain(model: DoctorModel): Doctor {
    return new Doctor({
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      mat_nac: model.mat_nac,
      mat_prov: model.mat_prov,
      active: model.active,
    });
  }
}
