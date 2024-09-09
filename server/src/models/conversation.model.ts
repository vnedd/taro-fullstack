import mongoose, { Document, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'Conversation';
const COLLECTION_NAME = 'Conversations';

interface IConversation extends Document {
  messages: mongoose.Types.ObjectId[];
  participants: mongoose.Types.ObjectId[];
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessageAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

conversationSchema.plugin(mongoosePaginate);

const Conversation = mongoose.model<IConversation, PaginateModel<IConversation>>(
  DOCUMENT_NAME,
  conversationSchema
);

export default Conversation;
