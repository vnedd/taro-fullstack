import mongoose from 'mongoose';

const DOCUMENT_NAME = 'Token';
const COLLECTION_NAME = 'Tokens';

const tokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    refresh_token: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

const Token = mongoose.model(DOCUMENT_NAME, tokenSchema);

export default Token;
