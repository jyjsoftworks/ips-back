// src/lib/Letter/infrastructure/ExpressLetterController.ts
import { Request, Response, NextFunction } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";
import { CreateLetterRequestDto } from "../application/Dto/CreateLetterRequestDto";
import { UpdateLetterRequestDto } from "../application/Dto/UpdateLetterRequestDto";

export class ExpressLetterController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const letters = await serviceContainer.letter.getAll.run();
      return res.json(letters);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const letter = await serviceContainer.letter.getById.run(id);
      return res.status(200).json(letter);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateLetterRequestDto;

      await serviceContainer.letter.create.run(dto);

      return res.status(201).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Sobre (letter) creado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const dto = req.body as UpdateLetterRequestDto;

      await serviceContainer.letter.update.run(id, dto);

      return res.status(200).json({
        code: "2002",
        message: errorMessages["2002"],
        detail: "Sobre (letter) modificado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
}
