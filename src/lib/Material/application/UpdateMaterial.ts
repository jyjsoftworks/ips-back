import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";
import { MaterialRepository } from "../domain/MaterialRepository";
import { CreateMaterialRequestDto } from "./Dto/CreateMaterialRequestDto";


export class UpdateMaterial {
    constructor(private materialRepository: MaterialRepository) {}

    async run(id:number, dto:CreateMaterialRequestDto): Promise <void>{
        const materialDto = plainToInstance(CreateMaterialRequestDto, dto);


        await validateOrReject(materialDto).catch(errors => {
            throw new GlobalAppException(
                400,
                '4001',
                'Errores de validación',
                this.formatErrors(errors)
            )
        })

        const existingMaterial= await this.materialRepository.getById(id);

        if (!existingMaterial) {
            throw new GlobalAppException(
                404,
                '4041',
                errorMessages['4041'] || 'material no encontrado',
                'El material con el ID especificado no existe'
            )
        };

        await this.materialRepository.update(id,materialDto);
    }



    private formatErrors(errors: ValidationError | ValidationError[]): string[] {
        if (!Array.isArray(errors)) {
            errors = [errors]; // Asegúrate de que sea un array
        }

        return errors.flatMap(error => 
            Object.values(error.constraints || {})
        );
    }
}