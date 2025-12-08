import { IsString, IsOptional } from "class-validator";

export class UpdateDoctorRequestDto {
  @IsOptional()
  @IsString({ message: "El nombre debe ser un string" })
  firstName?: string;

  @IsOptional()
  @IsString({ message: "El apellido debe ser un string" })
  lastName?: string;

  @IsOptional()
  @IsString({ message: "La matrícula nacional debe ser un string" })
  mat_nac?: string;

  @IsOptional()
  @IsString({ message: "La matrícula provincial debe ser un string" })
  mat_prov?: string;
}
