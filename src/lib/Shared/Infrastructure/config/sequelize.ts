import { Sequelize } from "sequelize";
import { DB_CONFIG } from "./config";
import exp from "constants";

import dotenv from 'dotenv';
import { UserModel } from "../../../User/infrastructure/ORM/UserModel";
import { RoleModel } from "../../../Role/infrastructure/ORM/RoleModel";
import { StatusModel } from "../../../Status/infrastructure/ORM/StatusModel";
import { SellerModel } from "../../../Seller/infrastructure/ORM/SellerModel";
import { PatientModel } from "../../../Patient/infrastructure/ORM/PatientModel";
import { DoctorModel } from "../../../Doctor/infrastructure/ORM/DoctorModel";
import { BranchOfficeModel } from "../../../BranchOffice/infrastructure/ORM/BranchOfficeModel";
dotenv.config();


const sequelize = new Sequelize({
    dialect: DB_CONFIG.dialect,
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    username: DB_CONFIG.username,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
    logging: false,
    pool: {
    max: parseInt(process.env.DB_POOL_MAX) || 10,
    min: parseInt(process.env.DB_POOL_MIN) || 0,
    acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
    idle: parseInt(process.env.DB_POOL_IDLE) || 10000
  }
    
});


const models = [UserModel, RoleModel, StatusModel, SellerModel, PatientModel,DoctorModel, BranchOfficeModel];
models.forEach((model) => model.initialize(sequelize))

// ACÁ DEBAJO DE ESTE COMENTARIO, VAN LAS RELACIONES ENTRE MODELOS


UserModel.associate();
RoleModel.associate();

export {sequelize};