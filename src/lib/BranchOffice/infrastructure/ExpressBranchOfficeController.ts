import { Request, Response, NextFunction } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";
import { CreateBranchOfficeRequestDto } from "../application/Dto/CreateBranchOfficeRequestDto";
import { UpdateBranchOfficeRequestDto } from "../application/Dto/UpdateBranchOfficeRequestDto";

export class ExpressBranchOfficeController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const branches = await serviceContainer.branchOffice.getAll.run();
      return res.json(branches);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const branch = await serviceContainer.branchOffice.getById.run(id);
      return res.status(200).json(branch);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateBranchOfficeRequestDto;

      await serviceContainer.branchOffice.create.run(dto);

      return res.status(201).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Sucursal creada exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const dto = req.body as UpdateBranchOfficeRequestDto;

      await serviceContainer.branchOffice.update.run(id, dto);

      return res.status(200).json({
        code: "2002",
        message: errorMessages["2002"],
        detail: "Sucursal modificada exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
}
