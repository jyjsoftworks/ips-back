import { IsString, IsNotEmpty, IsNumber, IsBoolean, Min } from "class-validator";

export class CreateTreatmentRequestDto {
  @IsNotEmpty({ message: "El nombre del tratamiento no puede estar vacío" })
  @IsString({ message: "El nombre del tratamiento debe ser un string" })
  name: string;

  @IsNumber({}, { message: "sphereLimit debe ser un número" })
  sphereLimit: number;

  @IsNumber({}, { message: "cylinderLimit debe ser un número" })
  cylinderLimit: number;

  @IsNumber({}, { message: "leadTimeDays debe ser un número" })
  @Min(0, { message: "leadTimeDays no puede ser negativo" })
  leadTimeDays: number;

  @IsNumber({}, { message: "El precio debe ser un número" })
  @Min(0, { message: "El precio no puede ser negativo" })
  price: number;

  @IsBoolean({ message: "commission debe ser un booleano" })
  commission: boolean;

  @IsNumber({}, { message: "El porcentaje de comisión debe ser un número" })
  @Min(0, { message: "El porcentaje de comisión no puede ser negativo" })
  commissionPercentage: number;
}
