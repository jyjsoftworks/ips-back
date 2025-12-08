import { IsString, IsNotEmpty } from "class-validator";

export class CreateDoctorRequestDto {
  @IsNotEmpty({ message: "El nombre no puede estar vacío" })
  @IsString({ message: "El nombre debe ser un string" })
  firstName: string;

  @IsNotEmpty({ message: "El apellido no puede estar vacío" })
  @IsString({ message: "El apellido debe ser un string" })
  lastName: string;

  @IsNotEmpty({ message: "La matrícula nacional no puede estar vacía" })
  @IsString({ message: "La matrícula nacional debe ser un string" })
  mat_nac: string;

  @IsNotEmpty({ message: "La matrícula provincial no puede estar vacía" })
  @IsString({ message: "La matrícula provincial debe ser un string" })
  mat_prov: string;
}
