import { IsString, IsNumber, IsBoolean, Min, IsOptional } from "class-validator";

export class UpdateLensFrameRequestDto {
  @IsOptional()
  @IsString({ message: "El número de patilla debe ser un string" })
  templeNumber?: string;

  @IsOptional()
  @IsString({ message: "La marca debe ser un string" })
  brand?: string;

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
