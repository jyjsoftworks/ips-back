// src/lib/Lens/infrastructure/ExpressLensController.ts
import { Request, Response, NextFunction } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";
import { CreateLensRequestDto } from "../application/Dto/CreateLensRequestDto";
import { UpdateLensRequestDto } from "../application/Dto/UpdateLensRequestDto";

export class ExpressLensController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const lenses = await serviceContainer.lens.getAll.run();
      return res.json(lenses);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const lens = await serviceContainer.lens.getById.run(id);
      return res.status(200).json(lens);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateLensRequestDto;

      await serviceContainer.lens.create.run(dto);

      return res.status(201).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Lente creado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const dto = req.body as UpdateLensRequestDto;

      await serviceContainer.lens.update.run(id, dto);

      return res.status(200).json({
        code: "2002",
        message: errorMessages["2002"],
        detail: "Lente modificado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
}
