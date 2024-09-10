import { Request, Response } from 'express';
import pusher from '~/config/pusher.config';

export class PusherService {
  static authorizeChannel = async (request: Request, response: Response) => {
    try {
      //@ts-ignore
      const userId = request.user?._id;

      const { socket_id: socketId, channel_name: channel } = request.body;

      const presenceData = {
        user_id: userId.toString()
      };

      const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);

      return response.send(authResponse);
    } catch (error) {
      console.error('Error authorizing Pusher channel:', error);
      return { status: 500, body: 'Internal Server Error' };
    }
  };
}
