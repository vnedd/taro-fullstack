import express from 'express';
import MessageController from '~/controllers/message.controller';
import { authMiddleware } from '~/middlewares/authMiddleware';

const messageRouter = express.Router();

// create a new message
messageRouter.post('/', authMiddleware, MessageController.createMessage);

export default messageRouter;
