import bcrypt from 'bcrypt';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { StatusCodes } from 'http-status-codes';
import Token from '~/models/token.model';
import User from '~/models/user.model';
import ApiError from '~/utils/ApiError';
import { checkRecordByField } from '~/utils/CheckRecord';
import jwtUtils from '~/utils/Jwt';

export class AuthService {
  static async register(req: Request) {
    const { username, email, password } = req.body;

    await checkRecordByField(User, 'email', email, false);

    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10)
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  }

  static async login(req: Request) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized to access');
    }

    if (user.google_id && !user.password) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Your account must be signed in with google provider'
      );
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email or Password is incorrect');
    }

    const accessToken = jwtUtils.createAccessToken(user._id);
    const refreshToken = jwtUtils.createRefreshToken();

    await Token.findOneAndUpdate(
      { user_id: user._id },
      { refresh_token: refreshToken },
      { upsert: true, new: true }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();
    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  static async loginGoogle(req: Request) {
    const { code } = req.body;
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'postmessage'
    );

    try {
      const { tokens } = await client.getToken(code);
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Google account information');
      }

      let user = await User.findOne({ email: payload.email });

      if (!user) {
        user = await User.create({
          username: payload.name || `user${Date.now()}`,
          email: payload.email,
          avatar_url: payload.picture || '',
          google_id: payload.sub || ''
        });
      } else {
        user.google_id = payload.sub || user.google_id;
        user.avatar_url = payload.picture || user.avatar_url;
        await user.save();
      }

      const accessToken = jwtUtils.createAccessToken(user.id);
      const refreshToken = jwtUtils.createRefreshToken();

      await Token.findOneAndUpdate(
        { user_id: user.id },
        { refresh_token: refreshToken },
        { upsert: true, new: true }
      );

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar_url: user.avatar_url
        }
      };
    } catch (error) {
      console.error('Error in Google login:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to authenticate with Google');
    }
  }

  static async logout(req: Request) {
    const { refreshToken } = req.body;
    return Token.findOneAndDelete({ refresh_token: refreshToken });
  }

  static async refreshToken(req: Request) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Refresh token is required');
    }

    const decodedToken = jwtUtils.decodeRefreshToken(refreshToken);
    if (!decodedToken) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token');
    }

    const tokenInfo = await Token.findOne({ refresh_token: refreshToken });
    if (!tokenInfo) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token not found');
    }

    const newAccessToken = jwtUtils.createAccessToken(tokenInfo.user_id);

    return { access_token: newAccessToken, refresh_token: refreshToken };
  }
}
