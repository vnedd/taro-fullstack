import mongoose, { PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'Category';
const COLLECTION_NAME = 'Categories';

interface ICategory extends Document {
  name: string;
  description?: string;
  image_url: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: String,
    image_url: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model<ICategory, PaginateModel<ICategory>>(DOCUMENT_NAME, categorySchema);

export default Category;
