import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsNumber,
} from "class-validator";

import { AppConstants } from "../../../../Utils/AppConstants";

export class CreateUserRequestDto {

  @IsNotEmpty({ message: "El nombre  no puede estar vacío" })
  firstName: string;

  @IsNotEmpty({ message: "El apellido  no puede estar vacío" })
  lastName: string;

  @IsEmail({}, { message: "Email no válido" })
  @IsString({ message: "El email debe ser un string" })
  email: string;

  @IsString({ message: "El email debe ser un string" })
  @Length(AppConstants.emailMin, AppConstants.emailMax, {
    message: `La contraseña no cumple con la longitud aceptada, minimo ${AppConstants.passwordMin} caracteres y máximo ${AppConstants.passwordMax} caracteres`,
  })
  password: string;

  @IsNotEmpty({ message: "El rol  no puede estar vacío" })
  role: string;
 

  constructor(
    firsName: string,
    lastName: string,
    email: string,
    password: string,  
    role: string, 
    
  ) {
    this.firstName = firsName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;    
    this.role = role;
    
  }
}
