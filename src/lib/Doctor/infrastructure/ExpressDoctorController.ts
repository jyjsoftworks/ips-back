// src/lib/Doctor/infrastructure/ExpressDoctorController.ts
import { Request, Response, NextFunction } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";
import { CreateDoctorRequestDto } from "../application/Dto/CreateDoctorRequestDto";
import { UpdateDoctorRequestDto } from "../application/Dto/UpdateDoctorRequestDto";

export class ExpressDoctorController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const doctors = await serviceContainer.doctor.getAll.run();
      return res.json(doctors);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const doctor = await serviceContainer.doctor.getById.run(id);
      return res.status(200).json(doctor);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateDoctorRequestDto;

      await serviceContainer.doctor.create.run(dto);

      return res.status(201).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Doctor creado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const dto = req.body as UpdateDoctorRequestDto;

      await serviceContainer.doctor.update.run(id, dto);

      return res.status(200).json({
        code: "2002",
        message: errorMessages["2002"],
        detail: "Doctor modificado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
}
