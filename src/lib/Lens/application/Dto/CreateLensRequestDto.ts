import { IsString, IsNotEmpty, IsInt, Min, IsOptional, IsNumber } from "class-validator";

export class CreateLensRequestDto {
  @IsNotEmpty({ message: "El tipo de lente no puede estar vacío" })
  @IsString({ message: "El tipo de lente debe ser un string" })
  type: string;

  @IsInt({ message: "frameId debe ser un entero" })
  @Min(1, { message: "frameId debe ser mayor a 0" })
  frameId: number;

  @IsInt({ message: "glassId debe ser un entero" })
  @Min(1, { message: "glassId debe ser mayor a 0" })
  glassId: number;

  @IsOptional()
  @IsNumber({}, { message: "leftSphere debe ser numérico" })
  leftSphere?: number;

  @IsOptional()
  @IsNumber({}, { message: "rightSphere debe ser numérico" })
  rightSphere?: number;

  @IsOptional()
  @IsNumber({}, { message: "leftCylinder debe ser numérico" })
  leftCylinder?: number;

  @IsOptional()
  @IsNumber({}, { message: "rightCylinder debe ser numérico" })
  rightCylinder?: number;

  @IsOptional()
  @IsInt({ message: "leftAxis debe ser un entero" })
  leftAxis?: number;

  @IsOptional()
  @IsInt({ message: "rightAxis debe ser un entero" })
  rightAxis?: number;

  @IsOptional()
  @IsNumber({}, { message: "leftAddition debe ser numérico" })
  leftAddition?: number;

  @IsOptional()
  @IsNumber({}, { message: "rightAddition debe ser numérico" })
  rightAddition?: number;

  @IsNumber({}, { message: "subtotal debe ser numérico" })
  subtotal: number;
}
