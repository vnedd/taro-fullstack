import express from 'express';
import { OrderController } from '~/controllers/order.controller';
import { authMiddleware } from '~/middlewares/authMiddleware';
import { objectIdValidation } from '~/validations/objectId.validation';

const orderRouter = express.Router();

// get all order
orderRouter.get('/', OrderController.getAllOrder);

// get one order by id
orderRouter.get('/:id', objectIdValidation, OrderController.getOneOrder);

// get one order by user
orderRouter.get('/user/:userId', OrderController.getOrderByUser);

// update a order by id
orderRouter.patch('/:id/shipping-update', authMiddleware, OrderController.updateShipingInfo);
orderRouter.patch('/:id/state-update', authMiddleware, OrderController.updateOrderState);
orderRouter.patch('/:id/canceled', authMiddleware, OrderController.canceledOrder);

// delete a order by id
orderRouter.delete('/:id', authMiddleware, objectIdValidation, OrderController.deleteOrderById);

export default orderRouter;
