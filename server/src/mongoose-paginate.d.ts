import mongoose from 'mongoose';
import { PaginateModel } from 'mongoose-paginate-v2';

declare module 'mongoose' {
  interface PaginateModel<T> extends mongoose.Model<T> {
    paginate: PaginateModel<T>['paginate'];
  }
}
