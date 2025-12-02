import { Op } from "sequelize";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";
import { MaterialRepository } from "../../domain/MaterialRepository";
import { Material } from "../../domain/Material";
import { MaterialModel } from "./MaterialModel";
import { CreateMaterialRequestDto } from "../../application/Dto/CreateMaterialRequestDto";


export class MaterialORMRepository implements MaterialRepository {

     async getById(id: number): Promise<Material | null> {
        const material = await MaterialModel.findByPk(id);
        return material ? this.mapToDomain(material) : null;
    };
    
    async update(id: number, material: CreateMaterialRequestDto): Promise<void> {
        const existingMaterial = await MaterialModel.findByPk(id);

        if (!existingMaterial) {
            throw new GlobalAppException(
                404,
                '4041',
                errorMessages['4041'],
                `El material con id ${id} no existe.`
            );
        }

        const duplicateMaterial = await MaterialModel.findOne({
            where:{name: {
                    [Op.iLike]: material.name // Compara sin importar mayúsculas o minúsculas
            }
            }
        });

        if (duplicateMaterial && duplicateMaterial.id !== id) {
            throw new GlobalAppException(
                400,
                '4033',
                errorMessages['4033'],
                `El material con nombre ${material.name} ya existe.`
            );
        };

        existingMaterial.name = material.name;

        await existingMaterial.save();
    };


    async getAllMaterials(): Promise<Material[]> {
        const materials = await MaterialModel.findAll()
        return materials.map(material => this.mapToDomain(material));
    }
    

    async getByName(name: string): Promise<Material | null> {
        const material = await MaterialModel.findOne({
            where: {
                name: { [Op.iLike]: name }
            }
        });
        return material ? this.mapToDomain(material) : null;
    }

    async createMaterials(material: Material): Promise<void> {
        
        await MaterialModel.create(material.mapToPrimitives());
    }


    private mapToDomain(materialModel: MaterialModel): Material {
    return new Material({
        id: materialModel.id,
        name: materialModel.name,
        active: materialModel.active,
    });
}
}