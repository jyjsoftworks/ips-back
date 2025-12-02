import { plainToInstance } from "class-transformer";
import { CategoryRepository } from "../domain/CategoryRepository";
import { Category } from "../domain/Category";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";


export class GetByIdCategory {
    constructor(private categoryRepository: CategoryRepository) {}

    async run(id: number): Promise<Category> {

        try {
            const categories = await this.categoryRepository.getById(id);

            if (!categories) {
                throw new GlobalAppException(
                    204,
                    '2006',
                    errorMessages['2006'],
                    `No se encontró la categoría con id ${id}`
                );
                
            }
             return categories;;

        } catch (error) {
            throw error instanceof GlobalAppException ? error : new GlobalAppException(
                500,
                'ERROR',
                'CategoryGetAllService',
                'Error inesperado al obtener la categoria.'    
            )
            
        }

      
    }
}