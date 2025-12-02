import { GlobalAppException } from "../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../message";
import { LensFrameRepository } from "../domain/LensFrameRepository";
import { LensFrame } from "../domain/LensFrame";



export class GetByIdLensFrame {
    constructor(private lensFrameRepository: LensFrameRepository) {}

    async run(id: number): Promise<LensFrame> {

        try {
            const lensFrames = await this.lensFrameRepository.getById(id);

            if (!lensFrames) {
                throw new GlobalAppException(
                    404,
                    '2006',
                    errorMessages['2006'],
                    `No se encontró el armazón con id ${id}`
                );
                
            }
             return lensFrames;;

        } catch (error) {
            throw error instanceof GlobalAppException ? error : new GlobalAppException(
                500,
                'ERROR',
                'LensFrameGetAllService',
                'Error inesperado al obtener el armazón.'    
            )
            
        }

      
    }
}