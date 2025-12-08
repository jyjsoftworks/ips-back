import express from 'express';
import { sequelize } from './lib/Shared/Infrastructure/config/sequelize';
import {Request, Response, NextFunction} from 'express'
import { GlobalAppException } from '../src/lib/Shared/Infrastructure/middleware/GlobalAppException';
import errorMessages from './message';
import dotenv from "dotenv";
dotenv.config();
import { expressUserRouter } from './lib/User/infrastructure/ExpressUserRouter';
import { expressAuthRouter } from './lib/User/auth/ExpressAuthRouter';
import { expressRoleRouter } from './lib/Role/infrastructure/ExpressRoleRouter';
import { expressCategoryRouter } from './lib/Category/infrastructure/ExpressCategoryRouter';
import { expressMaterialRouter } from './lib/Material/infrastructure/ExpressMaterialRouter';
import { expressLensFrameRouter } from './lib/LensFrame/infrastructure/ExpressLensFrameRouter';
import { expressTreatmentRouter } from './lib/Treatment/infrastructure/ExpressTreatmentRouter';
import { expressGlassRouter } from './lib/Glass/infrastructure/ExpressGlassRouter';
import { expressBranchOfficeRouter } from "./lib/BranchOffice/infrastructure/ExpressBranchOfficeRouter";
import { expressSellerRouter } from "./lib/Seller/infrastructure/ExpressSellerRouter";
import { expressDoctorRouter } from "./lib/Doctor/infrastructure/ExpressDoctorRouter";

import runSeeders from './seed';


import checkAuth from './lib/Utils/checkAuth';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

// const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";


app.use(express.json());
app.use(cookieParser()); 
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(cors());
app.use(expressAuthRouter)
app.use(checkAuth,expressUserRouter);
app.use(checkAuth,expressRoleRouter)
app.use(checkAuth,expressCategoryRouter)
app.use(checkAuth,expressMaterialRouter)
app.use(checkAuth,expressLensFrameRouter)
app.use(checkAuth,expressTreatmentRouter)
app.use(checkAuth,expressGlassRouter)
app.use(checkAuth, expressBranchOfficeRouter);
app.use(checkAuth, expressSellerRouter);
app.use(checkAuth, expressDoctorRouter);



app.use((err:any, req: Request, res:Response, next: NextFunction)=> {
  if (err instanceof GlobalAppException) {
    res.status(err.status).json({
      code: err.code,
      message: err.message,
      detail: err.details
    })
  } else {
    res.status(500).json({
      code: '999',
      message: errorMessages['5000'] || 'error desconocido'
      })
  }
})


sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log('📦 Base de datos sincronizada con éxito');

    // 🚜 Ejecutar semillas ANTES de levantar el server
    return runSeeders()
      .then(() => {
        console.log('🌱 Semillas ejecutadas con éxito.');
        
        app.listen(3000, () => {
          console.log(`🚀 Servidor escuchando en http://${host}:3000`);
        });
      })
      .catch((error: unknown) => {
        const msg = error instanceof Error ? error.message : String(error);
        console.error('❌ Error al ejecutar las semillas:', msg);
        // Si falla el seeding, no levantamos el server
        process.exit(1);
      });
  })
  .catch((error: unknown) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error al sincronizar la base de datos:', msg);
    process.exit(1);
  });












