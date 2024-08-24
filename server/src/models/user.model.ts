import mongoose, { Schema } from 'mongoose';
import { ERole } from '~/types/user';

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    google_id: {
      type: String,
      sparse: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    avatar_url: {
      type: String
    },
    role: {
      type: String,
      enum: ERole,
      default: ERole.MEMBER
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

const User = mongoose.model(DOCUMENT_NAME, userSchema);

export default User;
