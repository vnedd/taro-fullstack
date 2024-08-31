import mongoose, { PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'Size';
const COLLECTION_NAME = 'Sizes';

interface ISize extends Document {
  name: string;
  value: string;
  order: number;
}

const sizeSchema = new Schema<ISize>(
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

sizeSchema.plugin(mongoosePaginate);

const Size = mongoose.model<ISize, PaginateModel<ISize>>(DOCUMENT_NAME, sizeSchema);

export default Size;
