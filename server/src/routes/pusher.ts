import express from 'express';
import { authMiddleware } from '~/middlewares/authMiddleware';
import { PusherService } from '~/services/pusher.service';

const pusherRouter = express.Router();

// create a new pusher
pusherRouter.post('/', authMiddleware, PusherService.authorizeChannel);

export default pusherRouter;
