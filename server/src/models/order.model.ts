import mongoose, { PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { EOrderStates, EPaymentStates } from '~/types/order';
import { IOrderItem } from './order-item.model';

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';

interface IOrder extends Document {
  total: number;
  isPaid: boolean;
  orderState: string;
  paymentState: string;
  customerName: string;
  address: string;
  phoneNumber: string;
  userId: string;
  trackingCode: string;
  orderItems: IOrderItem[];
}

const orderSchema = new Schema<IOrder>(
  {
    total: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    orderState: {
      type: String,
      enum: EOrderStates,
      default: EOrderStates.Unfulfilled
    },
    paymentState: {
      type: String,
      enum: EPaymentStates,
      default: EPaymentStates.Unpaid
    },
    customerName: { type: String, default: '' },
    address: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    userId: { type: String, required: true },
    trackingCode: { type: String, default: '' },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OrderItem'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

orderSchema.plugin(mongoosePaginate);

const Order = mongoose.model<IOrder, PaginateModel<IOrder>>(DOCUMENT_NAME, orderSchema);

export default Order;
