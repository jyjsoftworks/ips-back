import { Router } from "express";
import { ExpressLensFrameController } from "./ExpressLensFrameController";

const controller = new ExpressLensFrameController();
export const expressLensFrameRouter = Router();


expressLensFrameRouter.get("/lensFrame/all", controller.getAll)
expressLensFrameRouter.get("/lensFrame/:id", controller.getById)
expressLensFrameRouter.post("/lensFrame/create", controller.create)
expressLensFrameRouter.patch("/lensFrame/:id", controller.update)

