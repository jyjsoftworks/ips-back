import { IsInt, Min, IsOptional } from "class-validator";

export class UpdateSellerRequestDto {
  @IsOptional()
  @IsInt({ message: "idUser debe ser un entero" })
  @Min(1, { message: "idUser debe ser mayor a 0" })
  idUser?: number;

  @IsOptional()
  @IsInt({ message: "idBranchOffice debe ser un entero" })
  @Min(1, { message: "idBranchOffice debe ser mayor a 0" })
  idBranchOffice?: number;
}
