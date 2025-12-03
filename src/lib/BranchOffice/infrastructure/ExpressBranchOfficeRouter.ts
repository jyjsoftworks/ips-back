import { Router } from "express";
import { ExpressBranchOfficeController } from "./ExpressBranchOfficeController";

const controller = new ExpressBranchOfficeController();
export const expressBranchOfficeRouter = Router();

expressBranchOfficeRouter.get("/branchOffice/all", controller.getAll);
expressBranchOfficeRouter.get("/branchOffice/:id", controller.getById);
expressBranchOfficeRouter.post("/branchOffice/create", controller.create);
expressBranchOfficeRouter.patch("/branchOffice/:id", controller.update);
