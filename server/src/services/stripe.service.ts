// src/services/StripeService.ts
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import Order from '~/models/order.model';
import { EPaymentStates } from '~/types/order';
import ApiError from '~/utils/ApiError';
import { endpointSecret, stripe } from '~/utils/Stripe';

export default class StripeService {
  static webhookService = async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] as string;
    const body = req.body;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (error: any) {
      console.error(`Webhook Error: ${error.message}`);
      throw new ApiError(StatusCodes.BAD_REQUEST, 'WEBHOOK ERROR');
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session?.metadata?.orderId;

    if (event.type === 'checkout.session.completed') {
      if (!orderId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Webhook missing order ID');
      }

      try {
        const order = await Order.findOneAndUpdate(
          { _id: orderId },
          { isPaid: true, paymentState: EPaymentStates.Paid },
          { new: true }
        );

        if (!order) {
          throw new ApiError(StatusCodes.BAD_REQUEST, 'Order not found');
        }
      } catch (error: any) {
        console.error(`Database update error: ${error.message}`);
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Database update error');
      }
    } else {
      return res.status(200).send(`Webhook received: ${event.type}`);
    }

    return res.status(200).send();
  };
}
