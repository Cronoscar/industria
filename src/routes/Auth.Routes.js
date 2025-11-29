import { Router } from 'express';
import AuthController from '../controllers/Auth.Controller.js';
import { authMiddleware } from '../middleware/auth.js';

const authRouter = Router();

authRouter.post('/auth/login', AuthController.login);
// authRouter.post('/auth/logout', AuthController.logout);
authRouter.post('/auth/refresh', AuthController.refresh);

export default authRouter;