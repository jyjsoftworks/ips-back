import { BranchOffice } from "./BranchOffice";
import { UpdateBranchOfficeRequestDto } from "../application/Dto/UpdateBranchOfficeRequestDto";

export interface BranchOfficeRepository {
  getAllBranchOffice(): Promise<BranchOffice[]>;
  getById(id: number): Promise<BranchOffice | null>;
  getByName(name: string): Promise<BranchOffice | null>;
  createBranchOffice(branchOffice: BranchOffice): Promise<void>;
  update(id: number, dto: UpdateBranchOfficeRequestDto): Promise<void>;
}
