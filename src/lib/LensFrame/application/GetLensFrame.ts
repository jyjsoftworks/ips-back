import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";
import { LensFrameRepository } from "../domain/LensFrameRepository";
import { LensFrame } from "../domain/LensFrame";



export class GetLensFrame {
    constructor(private lensFrameRepository: LensFrameRepository) {}

    async run(): Promise<LensFrame[]> {

        try {
            const lensFrames = await this.lensFrameRepository.getAllLensFrame();

            if (!lensFrames.length) {
                throw new GlobalAppException(
                    204,
                    '2006',
                    errorMessages['2006'],
                    'No se encontraron armazones'
                );
                
            }
            return lensFrames;

        } catch (error) {
            throw error instanceof GlobalAppException ? error : new GlobalAppException(
                500,
                'ERROR',
                'MaterialGetAllService',
                'Error inesperado al obtener armazones.'
            )
            
        }

      
    }
}