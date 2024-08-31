import express from 'express';
import { authMiddleware } from '~/middlewares/authMiddleware';
import CheckoutService from '~/services/checkout.service';
import StripeService from '~/services/stripe.service';

const checkoutRouter = express.Router();

checkoutRouter.use('/webhook', authMiddleware, StripeService.webhookService);
checkoutRouter.use('/checkout', authMiddleware, CheckoutService.handleCheckout);

export default checkoutRouter;
