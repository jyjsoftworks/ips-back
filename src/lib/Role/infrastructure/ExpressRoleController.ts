import { NextFunction, Request, Response } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import { RoleCreateRequestDTO } from "../application/dto/request/RoleCreateRequestDTO";
import { plainToInstance } from "class-transformer";

export class ExpressRoleController {
  async getAllRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await serviceContainer.role.getAll.run();
      return res.status(200)
      .json(role);

    } catch (error) {
      next(error);
    }
  }

  async createRole(req: Request, res: Response, next: NextFunction){
    try {
      const dto= plainToInstance(RoleCreateRequestDTO, req.body)
      const role = await serviceContainer.role.createRole.run(dto);
      
      return res
      .status(200)
      .json({ message: "Rol creado correctamente" });
      

    } catch (error) {
      next (error)      
    }
  }
}
