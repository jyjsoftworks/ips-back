import { plainToInstance } from "class-transformer";
import { CategoryRepository } from "../domain/CategoryRepository";
import { CreateCategoryRequestDto } from "./Dto/CreateCategoryRequestDto";
import { validateOrReject, ValidationError } from "class-validator";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import { Category } from "../domain/Category";
import errorMessages from "../../../message";


export class CreateCategory {
    constructor (private categoryRepository: CategoryRepository) {}

    async run (dto: CreateCategoryRequestDto): Promise <void> {
        const categoryDto = plainToInstance(CreateCategoryRequestDto, dto);

         await validateOrReject(categoryDto).catch(errors => {
                throw new GlobalAppException(
                    400,
                    '4001',
                    'Errores de validación',
                    this.formatErrors(errors)
                );
            });
        
        const category = new Category({
            name: dto.name,
            active: true,
        });

        console.log();
        

        const existingCategory = await this.categoryRepository.getByName(dto.name);

        if (existingCategory == null) {                
                await this.categoryRepository.createCategories(category);
            } else {
                throw new GlobalAppException(
                    400, // Status HTTP
                    '4000', // Código de error
                    errorMessages['4000'], // Mensaje técnico
                    'La categoria ya existe.' // Detalles para el usuario
                );
            }
            
    }

    private formatErrors(errors: ValidationError[]): string[] {
            return errors.flatMap(error => 
                Object.values(error.constraints)
            )
        }
}