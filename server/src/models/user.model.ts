import mongoose, { Document, Schema } from 'mongoose';
import { ERole } from '~/types/user';
import mongoosePaginate from 'mongoose-paginate-v2';

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

interface IUser extends Document {
  _id?: mongoose.Types.ObjectId;
  username: string;
  password?: string;
  google_id?: string;
  email: string;
  avatar_url?: string;
  role: ERole;
  wishlist: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
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
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME
  }
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.model<IUser, mongoose.PaginateModel<IUser>>(DOCUMENT_NAME, userSchema);

export default User;
