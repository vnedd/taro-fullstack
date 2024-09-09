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

  static getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await UserService.getAllUsers(req);

      SuccessResponse(res, StatusCodes.OK, 'Get All User successfully', metaData, others);
    } catch (error) {
      next(error);
    }
  };

  static getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await UserService.getAllAdmin(req);

      SuccessResponse(res, StatusCodes.OK, 'Get All Admin successfully', metaData, others);
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
  static updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userProfile = await UserService.updateUserInfo(req);

      SuccessResponse(
        res,
        StatusCodes.OK,
        'User updated successfully',
        Transformer.transformObjectTypeSnakeToCamel(userProfile)
      );
    } catch (error) {
      next(error);
    }
  };
}
