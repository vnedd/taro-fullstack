import mongoose, { PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'Color';
const COLLECTION_NAME = 'Colors';

interface IColor extends Document {
  name: string;
  value: string;
  order: number;
}

const colorSchema = new Schema<IColor>(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    order: { type: Number }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

colorSchema.plugin(mongoosePaginate);

const Color = mongoose.model<IColor, PaginateModel<IColor>>(DOCUMENT_NAME, colorSchema);

export default Color;
