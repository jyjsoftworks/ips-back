import { Router } from "express";
import { ExpressCategoryController } from "./ExpressCategoryController";


const controller = new ExpressCategoryController();
export const expressCategoryRouter =  Router();


expressCategoryRouter.get("/category/all", controller.getAll)
expressCategoryRouter.get("/category/:id", controller.getById)
expressCategoryRouter.post("/category/create", controller.create)
expressCategoryRouter.patch("/category/:id", controller.update)

