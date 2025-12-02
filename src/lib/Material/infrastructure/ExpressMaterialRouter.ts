import { Router } from "express";
import { ExpressMaterialController } from "./ExpressMaterialController";


const controller = new ExpressMaterialController();
export const expressMaterialRouter =  Router();


expressMaterialRouter.get("/material/all", controller.getAll)
expressMaterialRouter.get("/material/:id", controller.getById)
expressMaterialRouter.post("/material/create", controller.create)
expressMaterialRouter.patch("/material/:id", controller.update)

