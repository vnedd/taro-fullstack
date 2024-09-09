import Message from '../models/message.model';
import { Request } from 'express';
import Conversation from '~/models/conversation.model';
import { Transformer } from '~/utils/transformer';
import pusher from '~/config/pusher.config';

export default class MessageService {
  static createMessage = async (req: Request) => {
    const { conversationId, body, image, senderId } = req.body;

    const message = await Message.create({ conversationId, body, image, senderId });

    const [updatedConversation, newMessage] = await Promise.all([
      Conversation.findByIdAndUpdate(
        conversationId,
        {
          $push: { messages: message._id },
          $set: { lastMessageAt: new Date() }
        },
        { new: true }
      ).populate('participants'),
      Message.findById(message._id).populate([{ path: 'senderId' }])
    ]);

    const transformedMessage = Transformer.transformObjectTypeSnakeToCamel(newMessage?.toObject());

    const pusherPromises = [
      pusher.trigger(`conversation_${conversationId}`, 'new_message', transformedMessage),
      ...(updatedConversation?.participants ?? []).map((participant) =>
        pusher.trigger(`conversations_user_${participant._id}`, 'update_conversation', {
          id: conversationId,
          messages: [transformedMessage]
        })
      )
    ];

    await Promise.all(pusherPromises);

    return transformedMessage;
  };
}
