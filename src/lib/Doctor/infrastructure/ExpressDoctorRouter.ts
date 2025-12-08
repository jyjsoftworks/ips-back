import { Router } from "express";
import { ExpressDoctorController } from "./ExpressDoctorController";

const controller = new ExpressDoctorController();
export const expressDoctorRouter = Router();

expressDoctorRouter.get("/doctor/all", controller.getAll);
expressDoctorRouter.get("/doctor/:id", controller.getById);
expressDoctorRouter.post("/doctor/create", controller.create);
expressDoctorRouter.patch("/doctor/:id", controller.update);
