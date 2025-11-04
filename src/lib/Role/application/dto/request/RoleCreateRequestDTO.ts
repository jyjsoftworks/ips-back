import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class RoleCreateRequestDTO {
    
    @IsNotEmpty({message: "El nombre del rol no puede estar vacío"})
    @IsString({message: "el tipo de dato del nombre debe ser un string"})
    name: string;     

}  