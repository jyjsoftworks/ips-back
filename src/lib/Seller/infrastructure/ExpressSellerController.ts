import { Request, Response, NextFunction } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";

import { CreateSellerRequestDto } from "../application/Dto/CreateSellerRequestDto";
import { UpdateSellerRequestDto } from "../application/Dto/UpdateSellerRequestDto";

export class ExpressSellerController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const sellers = await serviceContainer.seller.getAll.run();
      return res.json(sellers);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const seller = await serviceContainer.seller.getById.run(id);
      return res.status(200).json(seller);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as CreateSellerRequestDto;

      await serviceContainer.seller.create.run(dto);

      return res.status(201).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Vendedor creado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const dto = req.body as UpdateSellerRequestDto;

      await serviceContainer.seller.update.run(id, dto);

      return res.status(200).json({
        code: "2002",
        message: errorMessages["2002"],
        detail: "Vendedor modificado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
}
