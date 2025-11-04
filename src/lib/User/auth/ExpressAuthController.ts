import { NextFunction, Request, Response } from "express";
import { CreateUserRequestDto } from "../application/dto/request/CreateUserRequestDto";
import { serviceContainer } from "../../Shared/ServiceContainer";
import errorMessages from "../../../message";
import { LoginUserRequestDto } from "../application/dto/request/LoginUserRequestDto";

export class ExpressAuthController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body as { user: CreateUserRequestDto };

      console.log("Request Body:", req.body);
      console.log("Parsed User:", user);

      await serviceContainer.user.create.run(user);

      return res.status(200).json({
        code: "2001",
        message: errorMessages["2001"],
        detail: "Usuario creado exitosamente",
      });
    } catch (error) {
      console.error("Error en create:", error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginData: LoginUserRequestDto = req.body;

      const token = await serviceContainer.user.login.run(loginData);
      console.log("🧠 Token generado:", token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 2,
      });

      return res.status(200).json({ 
        message: "Login exitoso",
        token:token

       });
    } catch (error) {
      console.error("💥 Error en login controller:", error);
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("token", {
      path: "/",
      sameSite: "strict",
      secure: false,
    });
    return res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    console.error("Error en logout:", error);
    next(error);
  }
}


  async UserMe(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.token; // con cookies
      if (!token) {
        return res.status(400).json({ error: "Token no proporcionado" });
      }
      // Llamar al caso de uso para obtener la información del usuario
      const userInfo = await serviceContainer.user.userMe.run(token);
      return res.status(200).json(userInfo);
    } catch (error) {
      console.error("Error en getUserInfo:", error);
      next(error); // Pasar el error al middleware de manejo de errores
    }
  }
}
