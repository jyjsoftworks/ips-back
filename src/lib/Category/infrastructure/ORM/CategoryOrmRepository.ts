import { Op } from "sequelize";
import { CreateCategoryRequestDto } from "../../application/Dto/CreateCategoryRequestDto";
import { Category } from "../../domain/Category";
import { CategoryRepository } from "../../domain/CategoryRepository";
import { CategoryModel } from "./CategoryModel";
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import errorMessages from "../../../../message";


export class CategoryORMRepository implements CategoryRepository {

     async getById(id: number): Promise<Category | null> {
        const category = await CategoryModel.findByPk(id);
        return category ? this.mapToDomain(category) : null;
    };
    
    async update(id: number, category: CreateCategoryRequestDto): Promise<void> {
        const existingCategory = await CategoryModel.findByPk(id);

        if (!existingCategory) {
            throw new GlobalAppException(
                404,
                '4041',
                errorMessages['4041'],
                `La categoria con id ${id} no existe.`
            );
        }

        const duplicateCategory = await CategoryModel.findOne({
            where:{name: {
                    [Op.iLike]: category.name // Compara sin importar mayúsculas o minúsculas
            }
            }
        });

        if (duplicateCategory && duplicateCategory.id !== id) {
            throw new GlobalAppException(
                400,
                '4033',
                errorMessages['4033'],
                `La cateogria con nombre ${category.name} ya existe.`
            );
        };

        existingCategory.name = category.name;

        await existingCategory.save();
    };


    async getAllCategories(): Promise<Category[]> {
        const categories = await CategoryModel.findAll()
        return categories.map(category => this.mapToDomain(category));
    }
    

    async getByName(name: string): Promise<Category | null> {
        const category = await CategoryModel.findOne({
            where: {
                name: { [Op.iLike]: name }
            }
        });
        return category ? this.mapToDomain(category) : null;
    }

    async createCategories(category: Category): Promise<void> {
        console.log("createcategoryormrepository");
        
        await CategoryModel.create(category.mapToPrimitives());
    }


    private mapToDomain(categoryModel: CategoryModel): Category {
    return new Category({
        id: categoryModel.id,
        name: categoryModel.name,
        active: categoryModel.active,
    });
}
}