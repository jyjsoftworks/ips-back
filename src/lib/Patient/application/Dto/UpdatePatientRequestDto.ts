import { IsString, IsOptional } from "class-validator";

export class UpdatePatientRequestDto {
  @IsOptional()
  @IsString({ message: "El nombre debe ser un string" })
  firstName?: string;

  @IsOptional()
  @IsString({ message: "El apellido debe ser un string" })
  lastName?: string;

  @IsOptional()
  @IsString({ message: "El DNI debe ser un string" })
  dni?: string;

  @IsOptional()
  @IsString({ message: "El teléfono debe ser un string" })
  phone?: string;

  @IsOptional()
  @IsString({ message: "La observación debe ser un string" })
  observation?: string;
}
