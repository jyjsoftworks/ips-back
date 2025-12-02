import { plainToInstance } from "class-transformer";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";
import { Material } from "../domain/Material";
import { MaterialRepository } from "../domain/MaterialRepository";


export class GetByIdMaterial {
    constructor(private materialRepository: MaterialRepository) {}

    async run(id: number): Promise<Material> {

        try {
            const materials = await this.materialRepository.getById(id);

            if (!materials) {
                throw new GlobalAppException(
                    404,
                    '2006',
                    errorMessages['2006'],
                    `No se encontró el material con id ${id}`
                );
                
            }
             return materials;;

        } catch (error) {
            throw error instanceof GlobalAppException ? error : new GlobalAppException(
                500,
                'ERROR',
                'MaterialGetAllService',
                'Error inesperado al obtener el material.'    
            )
            
        }

      
    }
}