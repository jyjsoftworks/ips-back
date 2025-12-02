import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";
import { MaterialRepository } from "../domain/MaterialRepository";
import { CreateMaterialRequestDto } from "./Dto/CreateMaterialRequestDto";
import { Material } from "../domain/Material";


export class CreateMaterial {
    constructor (private materialRepository: MaterialRepository) {}

    async run (dto: CreateMaterialRequestDto): Promise <void> {
        const materialDto = plainToInstance(CreateMaterialRequestDto, dto);

         await validateOrReject(materialDto).catch(errors => {
                throw new GlobalAppException(
                    400,
                    '4001',
                    'Errores de validación',
                    this.formatErrors(errors)
                );
            });
        
        const material = new Material({
            name: dto.name,
            active: true,
        });

        const existingMaterial = await this.materialRepository.getByName(dto.name);

        if (existingMaterial == null) {                
                await this.materialRepository.createMaterials(material);
            } else {
                throw new GlobalAppException(
                    400, // Status HTTP
                    '4000', // Código de error
                    errorMessages['4000'], // Mensaje técnico
                    'El material ya existe.' // Detalles para el usuario
                );
            }
            
    }

    private formatErrors(errors: ValidationError[]): string[] {
            return errors.flatMap(error => 
                Object.values(error.constraints)
            )
        }
}