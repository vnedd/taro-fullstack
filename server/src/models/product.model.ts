import mongoose, { Document, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  discount: number;
  isFeatured: boolean;
  category: mongoose.Types.ObjectId;
  product_sizes: mongoose.Types.ObjectId[];
  product_colors: mongoose.Types.ObjectId[];
  product_styles: mongoose.Types.ObjectId[];
  variants: mongoose.Types.ObjectId[];
  images: string[];
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    discount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    product_sizes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Size'
      }
    ],
    product_colors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Color'
      }
    ],
    product_styles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Style'
      }
    ],
    variants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Variant'
      }
    ],
    images: [{ type: String }]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model<IProduct, PaginateModel<IProduct>>(DOCUMENT_NAME, productSchema);

export default Product;
