import { Router } from 'express';
import { ExpressAuthController } from './ExpressAuthController';
import checkAuth from '../../Utils/checkAuth';

const controller = new ExpressAuthController();

const expressAuthRouter = Router();


expressAuthRouter.post('/auth/register',checkAuth,  controller.create)
expressAuthRouter.post('/auth/login', controller.login)
expressAuthRouter.get('/user/me',checkAuth, controller.UserMe)
expressAuthRouter.post("/logout",checkAuth,  controller.logout);


export {expressAuthRouter}