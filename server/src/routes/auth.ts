import express from 'express';
import { AuthController } from '~/controllers/auth.controller';
import { authMiddleware } from '~/middlewares/authMiddleware';
import authValidation from '~/validations/auth.validation';

const authRouter = express.Router();

authRouter.post('/register', authValidation.registerValidation, AuthController.register);
authRouter.post('/login', authValidation.loginValidation, AuthController.login);
authRouter.post('/google', AuthController.loginGoogle);
authRouter.post('/logout', AuthController.logout);

authRouter.post('/refresh-token', AuthController.refreshToken);

export default authRouter;
