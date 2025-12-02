import { IsString, IsNotEmpty } from "class-validator";

export class CreateMaterialRequestDto {
    
    @IsNotEmpty({message: "El nombre de la categoría no puede estar vacío"})
    @IsString({message: "el tipo de dato del nombre debe ser un string"})
    name: string;     

}  
