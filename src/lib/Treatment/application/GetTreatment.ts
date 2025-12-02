import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";
import { TreatmentRepository } from "../domain/TreatmentRepository";
import { Treatment } from "../domain/Treatment";



export class GetTreatment {
    constructor(private treatmentRepository: TreatmentRepository) {}

    async run(): Promise<Treatment[]> {

        try {
            const treatments = await this.treatmentRepository.getAllTreatment();

            if (!treatments.length) {
                throw new GlobalAppException(
                    204,
                    '2006',
                    errorMessages['2006'],
                    'No se encontraron tratamientos'
                );
                
            }
            return treatments;

        } catch (error) {
            throw error instanceof GlobalAppException ? error : new GlobalAppException(
                500,
                'ERROR',
                'TreatmentGetAllService',
                'Error inesperado al obtener armazones.'
            )
            
        }

      
    }
}