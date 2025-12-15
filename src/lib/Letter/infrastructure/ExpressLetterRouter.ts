import { Router } from "express";
import { ExpressLetterController } from "./ExpressLetterController";

const controller = new ExpressLetterController();
export const expressLetterRouter = Router();

expressLetterRouter.get("/letter/all", controller.getAll);
expressLetterRouter.get("/letter/:id", controller.getById);
expressLetterRouter.post("/letter/create", controller.create);
expressLetterRouter.patch("/letter/:id", controller.update);
