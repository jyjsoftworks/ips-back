import { Router } from "express";
import { ExpressTreatmentController } from "./ExpressTreatmentController";

const controller = new ExpressTreatmentController();
export const expressTreatmentRouter = Router();

expressTreatmentRouter.get("/treatment/all", controller.getAll);
expressTreatmentRouter.get("/treatment/:id", controller.getById);
expressTreatmentRouter.post("/treatment/create", controller.create);
expressTreatmentRouter.patch("/treatment/:id", controller.update);
