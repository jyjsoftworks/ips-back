import { Request, Response, NextFunction } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";
import { CreatePatientRequestDto } from "../application/Dto/CreatePatientRequestDto";
import { UpdatePatientRequestDto } from "../application/Dto/UpdatePatientRequestDto";

export class ExpressPatientController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const patients = await serviceContainer.patient.getAll.run();
      return res.json(patients);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const patient = await serviceContainer.patient.getById.run(id);
      return res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreatePatientRequestDto;

      await serviceContainer.patient.create.run(dto);

      return res.status(201).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Paciente creado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const dto = req.body as UpdatePatientRequestDto;

      await serviceContainer.patient.update.run(id, dto);

      return res.status(200).json({
        code: "2002",
        message: errorMessages["2002"],
        detail: "Paciente modificado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
}
