import { Router } from "express";
import { ExpressPatientController } from "./ExpressPatientController";

const controller = new ExpressPatientController();
export const expressPatientRouter = Router();

expressPatientRouter.get("/patient/all", controller.getAll);
expressPatientRouter.get("/patient/:id", controller.getById);
expressPatientRouter.post("/patient/create", controller.create);
expressPatientRouter.patch("/patient/:id", controller.update);
