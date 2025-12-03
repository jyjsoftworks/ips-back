import { IsInt, Min } from "class-validator";

export class CreateSellerRequestDto {
  @IsInt({ message: "idUser debe ser un entero" })
  @Min(1, { message: "idUser debe ser mayor a 0" })
  idUser: number;

  @IsInt({ message: "idBranchOffice debe ser un entero" })
  @Min(1, { message: "idBranchOffice debe ser mayor a 0" })
  idBranchOffice: number;
}
