import { serviceContainer } from "../../Shared/ServiceContainer";
import { CreateCategoryRequestDto } from "../application/Dto/CreateCategoryRequestDto";
import { Express,Request,Response, NextFunction } from "express";
import errorMessages from "../../../message";



export class ExpressCategoryController {

  async getAll (req: Request, res: Response, next: NextFunction) { 
    try {
      const categories = await serviceContainer.category.getAll.run();
                  
      return res.json(categories);
      
    } catch (error) {
      next(error);
    }
  }

    async create(req: Request, res: Response, next: NextFunction) {
      try {
        console.log("dentro del controller");
        
        const category = req.body as CreateCategoryRequestDto;

        await serviceContainer.category.create.run(category);

        return res.status(201).json({
          code: '2001',
          message: errorMessages['2001'],
          detail: 'Categoria creada exitosamente',
        });
      } catch (error) {
        next(error);
      }
    }

  async update (req: Request, res: Response, next: NextFunction) {
    try {

      const id = parseInt(req.params.id);
      const category = req.body as CreateCategoryRequestDto;
 
      await serviceContainer.category.update.run(
        id,
        category
      )

      return res.status(200).json({
            code:'2002',
            message:errorMessages['2002'],
            detail: 'Categoria modificada exitosamente'
        })
      
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const category = await serviceContainer.category.getById.run(id);
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}


}