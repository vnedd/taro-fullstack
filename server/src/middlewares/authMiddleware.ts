import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import ApiError from '~/utils/ApiError';
import User from '~/models/user.model';
import jwtUtils from '~/utils/Jwt';

interface JwtPayload {
  id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.get('Authorization')?.split(' ').at(1);

  try {
    // check if accessToken exists
    if (!accessToken) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Not authorized');

    // decode accessToken to get user_id
    const { user_id } = jwtUtils.decodeAccessToken(accessToken) as JwtPayload & { user_id?: string };

    const user = await User.findById(user_id);

    if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized to access');

    req.user = {
      ...user.toObject(),
      accessToken
    };

    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, error instanceof Error ? error.message : String(error)));
  }
};
