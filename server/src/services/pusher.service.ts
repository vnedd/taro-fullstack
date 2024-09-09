import { Request } from 'express';
import pusher from '~/config/pusher.config';

export class PusherService {
  static authorizeChannel = async (request: Request) => {
    try {
      //@ts-ignore
      const userId = request.user?._id; // Assuming 'id' is the correct property

      const contentType = request.headers['content-type'] || '';

      let body;
      if (contentType.includes('application/json')) {
        body = request.body; // Express should have already parsed JSON
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        body = request.body; // Express should have already parsed form data
      } else {
        return { status: 415, body: 'Unsupported content type' };
      }

      const { socket_id: socketId, channel_name: channel } = body;

      const presenceData = {
        user_id: userId,
        user_info: {}
      };

      const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
      return { status: 200, body: authResponse };
    } catch (error) {
      console.error('Error authorizing Pusher channel:', error);
      return { status: 500, body: 'Internal Server Error' };
    }
  };
}
