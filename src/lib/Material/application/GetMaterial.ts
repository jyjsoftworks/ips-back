import { plainToInstance } from "class-transformer";
import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";
import { MaterialRepository } from "../domain/MaterialRepository";
import { Material } from "../domain/Material";


export class GetMaterial {
    constructor(private materialRepository: MaterialRepository) {}

    async run(): Promise<Material[]> {

        try {
            const materials = await this.materialRepository.getAllMaterials();

            if (!materials.length) {
                throw new GlobalAppException(
                    204,
                    '2006',
                    errorMessages['2006'],
                    'No se encontraron materiales'
                );
                
            }
            return materials;

        } catch (error) {
            throw error instanceof GlobalAppException ? error : new GlobalAppException(
                500,
                'ERROR',
                'MaterialGetAllService',
                'Error inesperado al obtener materiales.'    
            )
            
        }

      
    }
}