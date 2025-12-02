import { IsString, IsNumber, IsBoolean, Min, IsOptional } from "class-validator";

export class UpdateTreatmentRequestDto {
  @IsOptional()
  @IsString({ message: "El nombre del tratamiento debe ser un string" })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: "sphereLimit debe ser un número" })
  sphereLimit?: number;

  @IsOptional()
  @IsNumber({}, { message: "cylinderLimit debe ser un número" })
  cylinderLimit?: number;

  @IsOptional()
  @IsNumber({}, { message: "leadTimeDays debe ser un número" })
  @Min(0, { message: "leadTimeDays no puede ser negativo" })
  leadTimeDays?: number;

  @IsOptional()
  @IsNumber({}, { message: "El precio debe ser un número" })
  @Min(0, { message: "El precio no puede ser negativo" })
  price?: number;

  @IsOptional()
  @IsBoolean({ message: "commission debe ser un booleano" })
  commission?: boolean;

  @IsOptional()
  @IsNumber({}, { message: "El porcentaje de comisión debe ser un número" })
  @Min(0, { message: "El porcentaje de comisión no puede ser negativo" })
  commissionPercentage?: number;
}
