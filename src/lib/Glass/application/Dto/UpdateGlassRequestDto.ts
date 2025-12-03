import { IsInt, Min, IsOptional } from "class-validator";

export class UpdateGlassRequestDto {
  @IsOptional()
  @IsInt({ message: "idCategory debe ser un entero" })
  @Min(1, { message: "idCategory debe ser mayor a 0" })
  idCategory?: number;

  @IsOptional()
  @IsInt({ message: "idMaterial debe ser un entero" })
  @Min(1, { message: "idMaterial debe ser mayor a 0" })
  idMaterial?: number;

  @IsOptional()
  @IsInt({ message: "idTreatment debe ser un entero" })
  @Min(1, { message: "idTreatment debe ser mayor a 0" })
  idTreatment?: number;
}
