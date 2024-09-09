import express from 'express';
import { UserController } from '~/controllers/user.controller';
import { authMiddleware } from '~/middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/profile', authMiddleware, UserController.getProfileUser);
userRouter.post('/toggle-wishlist', authMiddleware, UserController.toggleWishlist);
userRouter.post('/update', authMiddleware, UserController.updateUser);
userRouter.get('/admins', UserController.getAllAdmin);

export default userRouter;
