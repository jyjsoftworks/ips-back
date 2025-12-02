import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { CategoryRepository } from "../domain/CategoryRepository";
import { CreateCategoryRequestDto } from "./Dto/CreateCategoryRequestDto";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";


export class UpdateCategory {
    constructor(private categoryRepository: CategoryRepository) {}

    async run(id:number, dto:CreateCategoryRequestDto): Promise <void>{
        const categoryDto = plainToInstance(CreateCategoryRequestDto, dto);


        await validateOrReject(categoryDto).catch(errors => {
            throw new GlobalAppException(
                400,
                '4001',
                'Errores de validación',
                this.formatErrors(errors)
            )
        })

        const existingcategory = await this.categoryRepository.getById(id);

        if (!existingcategory) {
            throw new GlobalAppException(
                404,
                '4041',
                errorMessages['4041'] || 'categoria no encontrada',
                'La categoria con el ID especificado no existe'
            )
        };

        await this.categoryRepository.update(id,categoryDto);
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