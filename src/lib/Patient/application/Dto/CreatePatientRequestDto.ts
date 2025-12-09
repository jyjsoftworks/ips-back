import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePatientRequestDto {
  @IsNotEmpty({ message: "El nombre no puede estar vacío" })
  @IsString({ message: "El nombre debe ser un string" })
  firstName: string;

  @IsNotEmpty({ message: "El apellido no puede estar vacío" })
  @IsString({ message: "El apellido debe ser un string" })
  lastName: string;

  @IsNotEmpty({ message: "El DNI no puede estar vacío" })
  @IsString({ message: "El DNI debe ser un string" })
  dni: string;

  @IsNotEmpty({ message: "El teléfono no puede estar vacío" })
  @IsString({ message: "El teléfono debe ser un string" })
  phone: string;

  @IsOptional()
  @IsString({ message: "La observación debe ser un string" })
  observation?: string;
}
