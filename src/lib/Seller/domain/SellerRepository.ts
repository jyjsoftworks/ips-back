import { Seller } from "./Seller";
import { UpdateSellerRequestDto } from "../application/Dto/UpdateSellerRequestDto";

export interface SellerRepository {
  getAll(): Promise<Seller[]>;
  getById(id: number): Promise<Seller | null>;
  createSeller(seller: Seller): Promise<void>;
  update(id: number, dto: UpdateSellerRequestDto): Promise<void>;
  getByUserAndBranch(idUser: number, idBranchOffice: number): Promise<Seller | null>;

}
