import mongoose, { Document, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'Messages';

interface IMessage extends Document {
  body?: string;
  image?: string;
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  isSeen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    body: { type: String },
    image: { type: String },
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isSeen: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

messageSchema.plugin(mongoosePaginate);

const Message = mongoose.model<IMessage, PaginateModel<IMessage>>(DOCUMENT_NAME, messageSchema);

export default Message;
