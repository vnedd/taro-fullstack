import mongoose, { PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'Variant';
const COLLECTION_NAME = 'Variants';

export interface IVariant extends Document {
  [x: string]: any;
  product: mongoose.Types.ObjectId;
  style: mongoose.Types.ObjectId;
  size: mongoose.Types.ObjectId;
  color: mongoose.Types.ObjectId;
  styleName: string;
  sizeName: string;
  colorName: string;
  price: number;
  stock: number;
}

const variantSchema = new Schema<IVariant>(
  {
    style: {
      type: Schema.Types.ObjectId,
      ref: 'Style'
    },
    styleName: { type: String, required: true },
    size: {
      type: Schema.Types.ObjectId,
      ref: 'Size'
    },
    sizeName: { type: String, required: true },
    color: {
      type: Schema.Types.ObjectId,
      ref: 'Color'
    },
    colorName: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

variantSchema.plugin(mongoosePaginate);

const Variant = mongoose.model<IVariant, PaginateModel<IVariant>>(DOCUMENT_NAME, variantSchema);

export default Variant;
