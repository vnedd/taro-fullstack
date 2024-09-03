import express from 'express';
import { authMiddleware } from '~/middlewares/authMiddleware';
import CheckoutService from '~/services/checkout.service';

const checkoutRouter = express.Router();

checkoutRouter.post('/', authMiddleware, CheckoutService.handleCheckout);

export default checkoutRouter;
