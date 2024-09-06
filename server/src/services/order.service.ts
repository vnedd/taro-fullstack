import { Request } from 'express';
import OrderItem from '~/models/order-item.model';
import Order from '~/models/order.model';
import { EOrderStates, EPaymentStates } from '~/types/order';
import { checkRecordByField } from '~/utils/CheckRecord';
import { getOrderFilterOptions, getPaginationOptions } from '~/utils/Pagination';
import { Transformer } from '~/utils/transformer';

export default class OrderService {
  static getAllOrder = async (req: Request) => {
    const filter = getOrderFilterOptions(req);

    const options = getPaginationOptions(req);

    options.populate = [
      { path: 'orderState' },
      { path: 'paymentState' },
      { path: 'tracking' },
      { path: 'orderItems' }
    ];

    const orders = await Order.paginate(filter, options);

    const { docs, ...otherFields } = orders;

    const transformedOrders = docs.map((order) => {
      return Transformer.transformObjectTypeSnakeToCamel(order.toObject());
    });

    return {
      metaData: Transformer.removeDeletedField(transformedOrders),
      others: { ...otherFields }
    };
  };

  static getOneOrder = async (req: Request) => {
    await checkRecordByField(Order, '_id', req.params.id, true);
    const data = await Order.findById(req.params.id).populate([
      { path: 'orderState' },
      { path: 'paymentState' },
      { path: 'tracking' },
      { path: 'orderItems' }
    ]);
    const order = Transformer.transformObjectTypeSnakeToCamel(data?.toObject());

    return order;
  };

  static getOrderByUser = async (req: Request) => {
    const { userId } = req.params;

    let data = await Order.find({
      userId
    }).populate([
      { path: 'orderState' },
      { path: 'paymentState' },
      { path: 'tracking' },
      { path: 'orderItems' }
    ]);
    if (!data) data = [];

    const transformedOrders = data.map((order) => {
      return Transformer.transformObjectTypeSnakeToCamel(order.toObject());
    });

    return {
      metaData: Transformer.removeDeletedField(transformedOrders),
      others: {}
    };
  };

  static updateShipingInfo = async (req: Request) => {
    const { id } = req.params;
    const { shippingInfo } = req.body;
    await checkRecordByField(Order, '_id', id, true);

    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: id },
      {
        customerName: shippingInfo.customerName,
        phoneNumber: shippingInfo.phone,
        address: shippingInfo.address
      },
      { new: true }
    );
    return updatedOrder;
  };

  static updateOrderState = async (req: Request) => {
    const { id } = req.params;
    const { orderState } = req.body;
    await checkRecordByField(Order, '_id', id, true);

    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: id },
      {
        orderState
      },
      { new: true }
    );
    return updatedOrder;
  };

  static canceledOrder = async (req: Request) => {
    const { id } = req.params;
    await checkRecordByField(Order, '_id', id, true);

    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: id },
      { orderState: EOrderStates.Cancelled, paymentState: EPaymentStates.Refunded },
      { new: true }
    );

    return updatedOrder;
  };

  static DeletedOrder = async (req: Request) => {
    const { id } = req.params;
    await checkRecordByField(Order, '_id', id, true);

    const deletedOrder = await Order.findByIdAndDelete({ _id: id });

    await OrderItem.deleteMany({ _id: { $in: deletedOrder?.orderItems } });
    return {};
  };
}
