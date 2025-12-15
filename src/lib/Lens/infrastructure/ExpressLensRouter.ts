import { Router } from "express";
import { ExpressLensController } from "./ExpressLensController";

const controller = new ExpressLensController();
export const expressLensRouter = Router();

expressLensRouter.get("/lens/all", controller.getAll);
expressLensRouter.get("/lens/:id", controller.getById);
expressLensRouter.post("/lens/create", controller.create);
expressLensRouter.patch("/lens/:id", controller.update);
