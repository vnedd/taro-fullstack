import { Request } from 'express';
import User from '~/models/user.model';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import bcrypt from 'bcrypt';
import { Transformer } from '~/utils/transformer';
import { getFilterOptions, getPaginationOptions } from '~/utils/Pagination';

export class UserService {
  static toggleWishlist = async (req: Request) => {
    //@ts-ignore
    const userId = req.user?._id;
    const { productId } = req.body;

    if (!userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const productIndex = user.wishlist.indexOf(productId);

    if (productIndex > -1) {
      // Product is in wishlist, remove it
      user.wishlist.splice(productIndex, 1);
      await user.save();
      return { message: 'Product removed from wishlist', inWishlist: false };
    } else {
      // Product is not in wishlist, add it
      user.wishlist.push(productId);
      await user.save();
      return { message: 'Product added to wishlist', inWishlist: true };
    }
  };

  static async getProfile(req: Request) {
    //@ts-ignore
    const user = await User.findById(req.user?._id)
      .populate([{ path: 'wishlist' }])
      .lean();

    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Authentication failed');
    }

    const { password: _, ...userProfile } = user;
    return userProfile;
  }

  static async updateUserInfo(req: Request) {
    //@ts-ignore
    const userId = req.user?._id;
    const { username, avatar_url, currentPassword, newPassword } = req.body;

    if (!userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
    }

    const user = await User.findById(userId);

    console.log(req.body);

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    if (username) user.username = username;
    if (avatar_url) user.avatar_url = avatar_url;

    if (currentPassword && newPassword) {
      const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password!);
      console.log(isPasswordCorrect);
      if (!isPasswordCorrect) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Current password is incorrect');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();

    const { password: _, ...updatedUserProfile } = user.toObject();
    return updatedUserProfile;
  }

  static async getAllUsers(req: Request) {
    const { get_all } = req.query;

    const filter = getFilterOptions(req, ['username', 'email']);

    let users;

    if (get_all === 'true') {
      users = await User.find(filter).select('-password');
      const transformedUsers = users.map((user) => {
        return Transformer.transformObjectTypeSnakeToCamel(user.toObject());
      });
      return {
        metaData: Transformer.removeDeletedField(transformedUsers),
        others: {}
      };
    }

    const options = getPaginationOptions(req);
    users = await User.paginate(filter, { ...options, select: '-password' });

    const { docs, ...otherFields } = users;

    const transformedUsers = docs.map((user) => {
      return Transformer.transformObjectTypeSnakeToCamel(user.toObject());
    });

    return {
      metaData: Transformer.removeDeletedField(transformedUsers),
      others: get_all === 'true' ? {} : otherFields
    };
  }
}
