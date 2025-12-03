import { Glass } from "./Glass";
import { UpdateGlassRequestDto } from "../application/Dto/UpdateGlassRequestDto";

export interface GlassRepository {
  getAll(): Promise<Glass[]>;
  getById(id: number): Promise<Glass | null>;
  createGlass(glass: Glass): Promise<void>;
  update(id: number, dto: UpdateGlassRequestDto): Promise<void>;
}
