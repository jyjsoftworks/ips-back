import { CreateCategoryRequestDto } from "../application/Dto/CreateCategoryRequestDto";
import { Category } from "./Category";


export interface CategoryRepository {

    getAllCategories(): Promise<Category[]>;
    getByName(name: string): Promise<Category | null>;
    createCategories(category:Category): Promise<void>;
    getById(id: number): Promise<Category | null>;
    update(id:number, category:CreateCategoryRequestDto): Promise<void>;

}