// src/services/CheckoutService.ts
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import OrderItem, { IOrderItem } from '~/models/order-item.model';
import Order from '~/models/order.model';
import { EPaymentStates } from '~/types/order';
import ApiError from '~/utils/ApiError';
import { stripe } from '~/utils/Stripe';

export default class CheckoutService {
  static async handleCheckout(req: Request, res: Response) {
    try {
      const { items, shippingInfo, userId } = req.body;

      if (!userId) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
      }

      if (!items || items.length === 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Product required');
      }

      if (!shippingInfo) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Shipping information required');
      }

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
        (item: IOrderItem) => ({
          quantity: item.quantity,
          price_data: {
            currency: 'USD',
            product_data: {
              name: [item.productName, item.styleName, item.colorName, item.sizeName].join(', ')
            },
            unit_amount: item.pricePerUnit * 100
          }
        })
      );

      const total = items.reduce(
        (acc: number, cur: IOrderItem) => acc + cur.pricePerUnit * cur.quantity,
        0
      );

      const order = await Order.create({
        isPaid: false,
        paymentState: EPaymentStates.Unpaid,
        userId,
        orderItems: [],
        total: total + 5.99,
        address: shippingInfo.address,
        phoneNumber: shippingInfo.phone,
        customerName: shippingInfo.customerName
      });

      const orderitems = await OrderItem.insertMany(
        items.map((item: IOrderItem) => ({
          variantId: item.variantId,
          styleName: item.styleName,
          productName: [item.productName, item.styleName, item.colorName, item.sizeName].join(', '),
          sizeName: item.sizeName,
          colorName: item.colorName,
          productImage: item.productImage,
          productId: item.productId,
          pricePerUnit: item.pricePerUnit,
          orderId: order._id,
          quantity: item.quantity
        }))
      );

      order.orderItems = orderitems.map((item) => item._id);
      await order.save();

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/checkout/${order._id}?success=1`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout?canceled=1&orderId=${order._id}`,
        metadata: {
          orderId: order._id.toString(),
          userId
        }
      });

      return res.status(200).json({ url: session.url });
    } catch (error) {
      console.log('CHECKOUT_ERROR', error);
      return res.status(500).send('Internal Server Error');
    }
  }
}
