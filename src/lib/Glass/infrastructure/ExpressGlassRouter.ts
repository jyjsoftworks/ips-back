import { Router } from "express";
import { ExpressGlassController } from "./ExpressGlassController";

const controller = new ExpressGlassController();
export const expressGlassRouter = Router();

expressGlassRouter.get("/glass/all", controller.getAll);
expressGlassRouter.get("/glass/:id", controller.getById);
expressGlassRouter.post("/glass/create", controller.create);
expressGlassRouter.patch("/glass/:id", controller.update);
