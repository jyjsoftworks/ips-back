// src/lib/LensFrame/infrastructure/ExpressLensFrameController.ts
import { Request, Response, NextFunction } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";
import { CreateLensFrameRequestDto } from "../application/Dto/CreateLensFrameRequestDto";
import { UpdateLensFrameRequestDto } from "../application/Dto/UpdateLensFrameRequestDto";

export class ExpressLensFrameController {

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const lensFrames = await serviceContainer.lensFrame.getAll.run();

      return res.json(lensFrames);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const lensFrameDto = req.body as CreateLensFrameRequestDto;

      await serviceContainer.lensFrame.create.run(lensFrameDto);

      return res.status(201).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Armazón creado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const lensFrameDto = req.body as UpdateLensFrameRequestDto;

      await serviceContainer.lensFrame.update.run(id, lensFrameDto);

      return res.status(200).json({
        code: "2002",
        message: errorMessages["2002"],
        detail: "Armazón modificado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const lensFrame = await serviceContainer.lensFrame.getById.run(id);

      return res.status(200).json(lensFrame);
    } catch (error) {
      next(error);
    }
  }
}
