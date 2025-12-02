import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";
import { TreatmentRepository } from "../domain/TreatmentRepository";
import { Treatment } from "../domain/Treatment";



export class GetByIdTreatment {
    constructor(private treatmentRepository: TreatmentRepository) {}

    async run(id: number): Promise<Treatment> {

        try {
            const treatment = await this.treatmentRepository.getById(id);

            if (!treatment) {
                throw new GlobalAppException(
                    404,
                    '2006',
                    errorMessages['2006'],
                    `No se encontró el tratamiento con id ${id}`
                );
                
            }
             return treatment;;

        } catch (error) {
            throw error instanceof GlobalAppException ? error : new GlobalAppException(
                500,
                'ERROR',
                'TreatmentGetAllService',
                'Error inesperado al obtener el armazón.'    
            )
            
        }

      
    }
}