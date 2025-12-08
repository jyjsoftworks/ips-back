import { Doctor } from "./Doctor";
import { UpdateDoctorRequestDto } from "../application/Dto/UpdateDoctorRequestDto";

export interface DoctorRepository {
  getAllDoctors(): Promise<Doctor[]>;
  getById(id: number): Promise<Doctor | null>;
  createDoctor(doctor: Doctor): Promise<void>;
  update(id: number, dto: UpdateDoctorRequestDto): Promise<void>;
  getByMatriculas(mat_nac: string, mat_prov: string): Promise<Doctor | null>;
}
