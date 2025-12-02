import { Request, Response, NextFunction } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";
import { CreateTreatmentRequestDto } from "../application/Dto/CreateTreatmentRequestDto";
import { UpdateTreatmentRequestDto } from "../application/Dto/UpdateTreatmentRequestDto";

export class ExpressTreatmentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const treatments = await serviceContainer.treatment.getAll.run();
      return res.json(treatments);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const treatment = await serviceContainer.treatment.getById.run(id);
      return res.status(200).json(treatment);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateTreatmentRequestDto;

      await serviceContainer.treatment.create.run(dto);

      return res.status(201).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Tratamiento creado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const dto = req.body as UpdateTreatmentRequestDto;

      await serviceContainer.treatment.update.run(id, dto);

      return res.status(200).json({
        code: "2002",
        message: errorMessages["2002"],
        detail: "Tratamiento modificado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
}
