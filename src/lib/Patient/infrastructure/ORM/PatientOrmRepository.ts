import { PatientRepository } from "../../domain/PatientRepository";
import { Patient } from "../../domain/Patient";
import { UpdatePatientRequestDto } from "../../application/Dto/UpdatePatientRequestDto";

import { PatientModel } from "./PatientModel";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";

export class PatientOrmRepository implements PatientRepository {
  async getAllPatients(): Promise<Patient[]> {
    const rows = await PatientModel.findAll();
    return rows.map((row) => this.mapToDomain(row));
  }

  async getById(id: number): Promise<Patient | null> {
    const row = await PatientModel.findByPk(id);
    return row ? this.mapToDomain(row) : null;
  }

  async getByDni(dni: string): Promise<Patient | null> {
    const row = await PatientModel.findOne({ where: { dni } });
    return row ? this.mapToDomain(row) : null;
  }

  async createPatient(patient: Patient): Promise<void> {
    await PatientModel.create({
      firstName: patient.firstName,
      lastName: patient.lastName,
      dni: patient.dni,
      phone: patient.phone,
      observation: patient.observation,
      active: patient.active,
    });
  }

  async update(id: number, dto: UpdatePatientRequestDto): Promise<void> {
    const existing = await PatientModel.findByPk(id);

    if (!existing) {
      throw new GlobalAppException(
        404,
        "2007",
        errorMessages["2007"],
        `El paciente con id ${id} no existe`
      );
    }

    const dataToUpdate: any = {};
    if (dto.firstName !== undefined) dataToUpdate.firstName = dto.firstName;
    if (dto.lastName !== undefined) dataToUpdate.lastName = dto.lastName;
    if (dto.dni !== undefined) dataToUpdate.dni = dto.dni;
    if (dto.phone !== undefined) dataToUpdate.phone = dto.phone;
    if (dto.observation !== undefined) dataToUpdate.observation = dto.observation;

    await PatientModel.update(dataToUpdate, { where: { id } });
  }

  private mapToDomain(model: PatientModel): Patient {
    return new Patient({
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      dni: model.dni,
      phone: model.phone,
      observation: model.observation,
      active: model.active,
    });
  }
}
