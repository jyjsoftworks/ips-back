import { CreateMaterialRequestDto } from "../application/Dto/CreateMaterialRequestDto";
import { Material } from "./Material";


export interface MaterialRepository {

    getAllMaterials(): Promise<Material[]>;
    getByName(name: string): Promise<Material | null>;
    createMaterials(material:Material): Promise<void>;
    getById(id: number): Promise<Material | null>;
    update(id:number, material:CreateMaterialRequestDto): Promise<void>;

}