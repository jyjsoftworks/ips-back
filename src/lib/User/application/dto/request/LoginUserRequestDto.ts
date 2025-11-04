import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginUserRequestDto {

    @IsNotEmpty({message: 'El email no puede estar vacío'})
    @IsEmail({}, {message: 'Debe ser un email válido'})
    email: string;


    @IsNotEmpty({message: 'La contraseña no puede estar vacía'})
    password: string;
}