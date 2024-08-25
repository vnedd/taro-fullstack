import mongoose, { PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'Style';
const COLLECTION_NAME = 'Styles';

interface IStyle extends Document {
  name: string;
  description?: string;
}

const styleSchema = new Schema<IStyle>(
  {
    name: { type: String, required: true },
    description: String
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

styleSchema.plugin(mongoosePaginate);

const Style = mongoose.model<IStyle, PaginateModel<IStyle>>(DOCUMENT_NAME, styleSchema);

export default Style;
