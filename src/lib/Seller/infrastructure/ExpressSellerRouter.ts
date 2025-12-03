import { Router } from "express";
import { ExpressSellerController } from "./ExpressSellerController";

const controller = new ExpressSellerController();
export const expressSellerRouter = Router();

expressSellerRouter.get("/seller/all", controller.getAll);
expressSellerRouter.get("/seller/:id", controller.getById);
expressSellerRouter.post("/seller/create", controller.create);
expressSellerRouter.patch("/seller/:id", controller.update);
