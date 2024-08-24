import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

class jwtUtils {
  // create a new access token
  static createAccessToken = (user_id: Types.ObjectId) => {
    const { ACCESS_SECRET } = process.env;

    return jwt.sign({ user_id }, ACCESS_SECRET as string, {
      expiresIn: 60 * 60 * 10
    });
  };

  // create a new refresh token
  static createRefreshToken = () => {
    const { REFRESH_SECRET } = process.env;
    const data = Math.random() + new Date().getTime();

    return jwt.sign({ data }, REFRESH_SECRET as string, {
      expiresIn: 60 * 60 * 24 * 7
    });
  };

  static decodeAccessToken = (token: string) => {
    const { ACCESS_SECRET } = process.env;

    return jwt.verify(token, ACCESS_SECRET as string);
  };

  static decodeRefreshToken = (token: string) => {
    const { REFRESH_SECRET } = process.env;

    return jwt.verify(token, REFRESH_SECRET as string);
  };
}

export default jwtUtils;
