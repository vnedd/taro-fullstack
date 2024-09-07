import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '~/services/auth.service';
import { SuccessResponse } from '~/utils/Response';
import { Transformer } from '~/utils/transformer';
import { Document } from 'mongoose';
export class AuthController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await AuthService.register(req);

      SuccessResponse(
        res,
        StatusCodes.OK,
        'Registration successfully',
        Transformer.transformObjectTypeSnakeToCamel(
          newUser instanceof Document ? newUser.toObject() : newUser
        )
      );
    } catch (error) {
      next(error);
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, accessToken, refreshToken } = await AuthService.login(req);

      const metaData = {
        userData: Transformer.transformObjectTypeSnakeToCamel(
          user instanceof Document ? user.toObject() : user
        ),
        accessToken: accessToken,
        refreshToken: refreshToken
      };

      SuccessResponse(res, StatusCodes.OK, 'Login successfully', metaData);
    } catch (error) {
      next(error);
    }
  };

  static loginGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken } = await AuthService.loginGoogle(req);

      SuccessResponse(res, StatusCodes.OK, 'Logout successfully', { accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthService.logout(req);

      SuccessResponse(res, StatusCodes.OK, 'Logout successfully', []);
    } catch (error) {
      next(error);
    }
  };

  static refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { access_token, refresh_token } = await AuthService.refreshToken(req);

      const metaData = {
        accessToken: access_token,
        refreshToken: refresh_token
      };

      SuccessResponse(
        res,
        StatusCodes.OK,
        'Refresh token successfully',
        Transformer.transformObjectTypeSnakeToCamel(metaData)
      );
    } catch (error) {
      next(error);
    }
  };
}
