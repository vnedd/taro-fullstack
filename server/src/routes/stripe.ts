import express from 'express';
import StripeService from '~/services/stripe.service';

const stripeRouter = express.Router();

stripeRouter.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  StripeService.webhookService
);

export default stripeRouter;
