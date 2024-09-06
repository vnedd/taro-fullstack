import express from 'express';
import { authMiddleware } from '~/middlewares/authMiddleware';
import { TrackingController } from '~/controllers/tracking.controller';

const trackingRouter = express.Router();
// create a new tracking
trackingRouter.post('/', authMiddleware, TrackingController.createTracking);

export default trackingRouter;
