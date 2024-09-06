import { Request } from 'express';
import Order from '~/models/order.model';
import Tracking from '~/models/tracking.model';
import { checkRecordByField } from '~/utils/CheckRecord';

export default class OrderService {
  static createTracking = async (req: Request) => {
    const { code, orderId } = req.body;
    await checkRecordByField(Tracking, 'code', code, false);
    await checkRecordByField(Order, '_id', orderId, true);

    const tracking = await Tracking.create({
      code,
      orderId
    });

    await Order.findByIdAndUpdate(
      { _id: orderId },
      {
        tracking: tracking.id
      }
    );

    return tracking;
  };
}
