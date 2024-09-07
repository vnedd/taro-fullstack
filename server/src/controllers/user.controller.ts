import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '~/services/user.service';
import { SuccessResponse } from '~/utils/Response';
import { Transformer } from '~/utils/transformer';
export class UserController {
  static getProfileUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userProfile = await UserService.getProfile(req);

      SuccessResponse(
        res,
        StatusCodes.OK,
        'Get Profile User successfully',
        Transformer.transformObjectTypeSnakeToCamel(userProfile)
      );
    } catch (error) {
      next(error);
    }
  };
  static toggleWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userProfile = await UserService.toggleWishlist(req);

      SuccessResponse(
        res,
        StatusCodes.OK,
        'Toggle Wishlist successfully',
        Transformer.transformObjectTypeSnakeToCamel(userProfile)
      );
    } catch (error) {
      next(error);
    }
  };
}
