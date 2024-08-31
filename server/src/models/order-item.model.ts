import mongoose, { Document, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'OrderItem';
const COLLECTION_NAME = 'OrderItems';

export interface IOrderItem extends Document {
  pricePerUnit: number;
  quantity: number;
  styleName: string;
  sizeName: string;
  colorName: string;
  productName: string;
  productImage: string;
  productId: mongoose.Types.ObjectId;
  variantId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    pricePerUnit: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    styleName: { type: String, required: true },
    sizeName: { type: String, required: true },
    productName: { type: String, required: true },
    colorName: { type: String, required: true },
    productImage: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: Schema.Types.ObjectId, ref: 'Variant', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

orderItemSchema.plugin(mongoosePaginate);

const OrderItem = mongoose.model<IOrderItem, PaginateModel<IOrderItem>>(
  DOCUMENT_NAME,
  orderItemSchema
);

export default OrderItem;
