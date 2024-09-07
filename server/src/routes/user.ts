import express from 'express';
import { UserController } from '~/controllers/user.controller';
import { authMiddleware } from '~/middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.get('/profile', authMiddleware, UserController.getProfileUser);
userRouter.post('/toggle-wishlist', authMiddleware, UserController.toggleWishlist);

export default userRouter;
