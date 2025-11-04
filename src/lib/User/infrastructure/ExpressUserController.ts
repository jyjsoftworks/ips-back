import { NextFunction, Request, Response } from "express";
import { serviceContainer } from "../../Shared/ServiceContainer";
import { plainToInstance } from "class-transformer";
import { UserUpdateRequestDto } from "../application/dto/request/UserUpdateRequestDto";
import {CreateUserRequestDto} from "../application/dto/request/CreateUserRequestDto"

export class ExpressUserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await serviceContainer.user.getAll.run();
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const dto = plainToInstance(UserUpdateRequestDto, req.body);

      await serviceContainer.user.updateUser.run(Number(id), dto);

      return res
        .status(200)
        .json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
      next(error);
    }
  }

  async userDelete  (req: Request, res: Response, next: NextFunction) {
    
    try {
      const { id } = req.params;
      await serviceContainer.user.userDelete.run(Number(id));

      return res
        .status(200)
        .json({ message: "Usuario eliminado" });

    } catch (error) {
      next(error);
    }
  }


async create(req: Request, res: Response, next: NextFunction) {
   
    try {
      const dto = plainToInstance(CreateUserRequestDto, req.body)
      
      
      await serviceContainer.user.create.run(dto);

      return res.status(200).json({ message: "Usuario creado correctamente"});
    } catch (error) {
      next(error)
    }
  }


async getUserByRole(req: Request, res: Response, next: NextFunction) {
  // const { roleName } = req.params;
  const roleName = String(req.params.roleName ?? '').trim().toUpperCase();
  console.log(req.params)

  try {
    const users = await serviceContainer.user.getUserByRole.run(roleName);
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

}

  

