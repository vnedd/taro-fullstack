import mongoose, { Document, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME_TRACKING = 'Tracking';
const COLLECTION_NAME_TRACKING = 'Trackings';

interface ITracking extends Document {
  code: string;
  orderId: mongoose.Types.ObjectId;
}

const trackingSchema = new Schema<ITracking>(
  {
    code: { type: String, unique: true, required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', unique: true, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME_TRACKING
  }
);

trackingSchema.plugin(mongoosePaginate);

const Tracking = mongoose.model<ITracking, PaginateModel<ITracking>>(
  DOCUMENT_NAME_TRACKING,
  trackingSchema
);

export default Tracking;
