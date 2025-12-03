import { IsInt, Min } from "class-validator";

export class CreateGlassRequestDto {
  @IsInt({ message: "idCategory debe ser un entero" })
  @Min(1, { message: "idCategory debe ser mayor a 0" })
  idCategory: number;

  @IsInt({ message: "idMaterial debe ser un entero" })
  @Min(1, { message: "idMaterial debe ser mayor a 0" })
  idMaterial: number;

  @IsInt({ message: "idTreatment debe ser un entero" })
  @Min(1, { message: "idTreatment debe ser mayor a 0" })
  idTreatment: number;
}
