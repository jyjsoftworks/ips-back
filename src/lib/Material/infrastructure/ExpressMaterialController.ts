import { serviceContainer } from "../../Shared/ServiceContainer";
import { Express,Request,Response, NextFunction } from "express";
import errorMessages from "../../../message";
import { CreateMaterialRequestDto } from "../application/Dto/CreateMaterialRequestDto";



export class ExpressMaterialController {

  async getAll (req: Request, res: Response, next: NextFunction) { 
    try {
      const materials = await serviceContainer.material.getAll.run();
                  
      return res.json(materials);
      
    } catch (error) {
      next(error);
    }
  }

    async create(req: Request, res: Response, next: NextFunction) {
      try {
        
        const material = req.body as CreateMaterialRequestDto;

        await serviceContainer.material.create.run(material);

        return res.status(201).json({
          code: '2001',
          message: errorMessages['2001'],
          detail: 'Material creado exitosamente',
        });
      } catch (error) {
        next(error);
      }
    }

  async update (req: Request, res: Response, next: NextFunction) {
    try {

      const id = parseInt(req.params.id);
      const material = req.body as CreateMaterialRequestDto;
 
      await serviceContainer.material.update.run(
        id,
        material
      )

      return res.status(200).json({
            code:'2002',
            message:errorMessages['2002'],
            detail: 'Material modificado exitosamente'
        })
      
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const material = await serviceContainer.material.getById.run(id);
    return res.status(200).json(material);
  } catch (error) {
    next(error);
  }
}


}