import { CreateLensFrameRequestDto } from "../application/Dto/CreateLensFrameRequestDto";
import { UpdateLensFrameRequestDto } from "../application/Dto/UpdateLensFrameRequestDto";
import { LensFrame } from "./LensFrame";


export interface LensFrameRepository {

    getAllLensFrame(): Promise<LensFrame[]>;
    getByTempleNumber(templeNumber: string): Promise<LensFrame | null>;
    createLensFrame(lensFrame:LensFrame): Promise<void>;
    getById(id: number): Promise<LensFrame | null>;
    update(id:number, lensFrame:UpdateLensFrameRequestDto): Promise<void>;

}