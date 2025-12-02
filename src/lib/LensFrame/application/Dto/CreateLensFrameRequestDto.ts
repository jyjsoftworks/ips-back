import { IsString, IsNotEmpty, IsNumber, IsBoolean, Min } from "class-validator";

export class CreateLensFrameRequestDto {
  @IsNotEmpty({ message: "El número de patilla no puede estar vacío" })
  @IsString({ message: "El número de patilla debe ser un string" })
  templeNumber: string;

  @IsNotEmpty({ message: "La marca no puede estar vacía" })
  @IsString({ message: "La marca debe ser un string" })
  brand: string;

  @IsNumber({}, { message: "El precio debe ser un número" })
  @Min(0, { message: "El precio no puede ser negativo" })
  price: number;

  @IsBoolean({ message: "commission debe ser un booleano" })
  commission: boolean;

  @IsNumber({}, { message: "El porcentaje de comisión debe ser un número" })
  @Min(0, { message: "El porcentaje de comisión no puede ser negativo" })
  commissionPercentage: number;
}
