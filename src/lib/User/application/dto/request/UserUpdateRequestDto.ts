import { IsString,IsEmail,IsNotEmpty } from "class-validator";

export class UserUpdateRequestDto {    
    @IsEmail({},{message: "el e-mail no es válido"})
    @IsNotEmpty({message: "el campo no puede estar vacío"})
    @IsString({message: "Debe ser un string"})
    email: string; 
    constructor(email: string) {
        this.email=email       
    }
}