import { Lens } from "./Lens";
import { UpdateLensRequestDto } from "../application/Dto/UpdateLensRequestDto";

export interface LensRepository {
  getAllLens(): Promise<Lens[]>;
  getById(id: number): Promise<Lens | null>;
  createLens(lens: Lens): Promise<void>;
  update(id: number, dto: UpdateLensRequestDto): Promise<void>;
}
