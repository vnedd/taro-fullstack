import express from 'express';
import ConversationController from '~/controllers/conversation.controller';
import { authMiddleware } from '~/middlewares/authMiddleware';

const conversationRouter = express.Router();

// get all color
conversationRouter.get('/user', authMiddleware, ConversationController.getConversationByUser);

// get one color by id
conversationRouter.get('/:id', authMiddleware, ConversationController.getConversationById);

// create a new color
conversationRouter.post('/', authMiddleware, ConversationController.createNewConversation);
conversationRouter.post('/:id/seen', authMiddleware, ConversationController.makeSeenedMessage);

export default conversationRouter;
