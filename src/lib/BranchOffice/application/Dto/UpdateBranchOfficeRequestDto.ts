import { IsString, IsOptional } from "class-validator";

export class UpdateBranchOfficeRequestDto {
  @IsOptional()
  @IsString({ message: "El nombre de la sucursal debe ser un string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "La dirección debe ser un string" })
  address?: string;
}
