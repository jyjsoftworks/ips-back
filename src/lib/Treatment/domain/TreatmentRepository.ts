import { UpdateTreatmentRequestDto } from "../application/Dto/UpdateTreatmentRequestDto";
import { Treatment } from "./Treatment";



export interface TreatmentRepository {
  getByName(name: string): Promise<Treatment | null>;
  getAllTreatment(): Promise<Treatment[]>;
  getById(id: number): Promise<Treatment | null>;
  createTreatment(treatment: Treatment): Promise<void>;
  update(id: number, dto: UpdateTreatmentRequestDto): Promise<void>;
}
