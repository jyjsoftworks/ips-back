import { Patient } from "./Patient";
import { UpdatePatientRequestDto } from "../application/Dto/UpdatePatientRequestDto";

export interface PatientRepository {
  getAllPatients(): Promise<Patient[]>;
  getById(id: number): Promise<Patient | null>;
  getByDni(dni: string): Promise<Patient | null>;
  createPatient(patient: Patient): Promise<void>;
  update(id: number, dto: UpdatePatientRequestDto): Promise<void>;
}
