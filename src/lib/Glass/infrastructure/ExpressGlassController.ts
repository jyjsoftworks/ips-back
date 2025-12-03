import { Request, Response, NextFunction } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";
import { CreateGlassRequestDto } from "../application/Dto/CreateGlassRequestDto";
import { UpdateGlassRequestDto } from "../application/Dto/UpdateGlassRequestDto";

export class ExpressGlassController {

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const glasses = await serviceContainer.glass.getAll.run();
      return res.json(glasses);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const glass = await serviceContainer.glass.getById.run(id);
      return res.status(200).json(glass);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateGlassRequestDto;

      await serviceContainer.glass.create.run(dto);

      return res.status(201).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Cristal creado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const dto = req.body as UpdateGlassRequestDto;

      await serviceContainer.glass.update.run(id, dto);

      return res.status(200).json({
        code: "2002",
        message: errorMessages["2002"],
        detail: "Cristal modificado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
}
