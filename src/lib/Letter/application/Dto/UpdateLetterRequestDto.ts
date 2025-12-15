import { IsInt, Min, IsOptional } from "class-validator";

export class UpdateLetterRequestDto {
  @IsOptional()
  @IsInt({ message: "idPatient debe ser un entero" })
  @Min(1, { message: "idPatient debe ser mayor a 0" })
  idPatient?: number;

  @IsOptional()
  @IsInt({ message: "idDoctor debe ser un entero" })
  @Min(1, { message: "idDoctor debe ser mayor a 0" })
  idDoctor?: number;

  @IsOptional()
  @IsInt({ message: "idSeller debe ser un entero" })
  @Min(1, { message: "idSeller debe ser mayor a 0" })
  idSeller?: number;
}
