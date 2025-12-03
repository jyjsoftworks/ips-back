import { IsString, IsNotEmpty } from "class-validator";

export class CreateBranchOfficeRequestDto {
  @IsNotEmpty({ message: "El nombre de la sucursal no puede estar vacío" })
  @IsString({ message: "El nombre de la sucursal debe ser un string" })
  name: string;

  @IsNotEmpty({ message: "La dirección no puede estar vacía" })
  @IsString({ message: "La dirección debe ser un string" })
  address: string;
}
