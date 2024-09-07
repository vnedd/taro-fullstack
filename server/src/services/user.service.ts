import { Request } from 'express';
import User from '~/models/user.model';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

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
}
