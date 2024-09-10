import Conversation from '~/models/conversation.model';
import ApiError from '~/utils/ApiError';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Transformer } from '~/utils/transformer';
import Message from '~/models/message.model';
import pusher from '~/config/pusher.config';

export default class ConversationService {
  static createConversation = async (req: Request) => {
    //@ts-ignore
    const userId = req.user?._id;
    const { participants }: { participants: string[] } = req.body;

    if (participants.length < 2) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'A conversation requires at least two participants'
      );
    }

    // Check if conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: { $all: participants, $size: participants.length }
    }).populate('participants');

    if (existingConversation) {
      return Transformer.transformObjectTypeSnakeToCamel(existingConversation.toObject());
    }

    const conversation = await Conversation.create({
      participants: participants,
      messages: [],
      lastMessageAt: new Date()
    });

    const newConversation = await Conversation.findById(conversation._id).populate([
      {
        path: 'participants'
      },
      {
        path: 'messages',
        populate: {
          path: 'senderId'
        }
      }
    ]);

    console.log(newConversation);

    await pusher.trigger(
      `conversations_user_${userId}`,
      'new_conversation',
      Transformer.transformObjectTypeSnakeToCamel(newConversation?.toObject())
    );

    return Transformer.transformObjectTypeSnakeToCamel(newConversation?.toObject());
  };

  static getConversationByUser = async (req: Request) => {
    //@ts-ignore
    const userId = req.user?._id;

    const conversation = await Conversation.find({
      participants: { $in: [userId] }
    }).populate([
      {
        path: 'participants'
      },
      {
        path: 'messages',
        populate: {
          path: 'senderId'
        }
      }
    ]);

    if (!conversation) {
      return {
        metaData: [],
        others: {}
      };
    }

    const transformedConversations = conversation.map((conv) => {
      return Transformer.transformObjectTypeSnakeToCamel(conv.toObject());
    });

    return {
      metaData: Transformer.removeDeletedField(transformedConversations),
      others: {}
    };
  };

  static getConversationById = async (req: Request) => {
    const { id } = req.params;
    const conversation = await Conversation.findById(id).populate([
      {
        path: 'participants'
      },
      {
        path: 'messages',
        populate: {
          path: 'senderId'
        }
      }
    ]);

    if (!conversation) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Conversation not found');
    }

    return Transformer.transformObjectTypeSnakeToCamel(conversation.toObject());
  };

  static makeSeenMessage = async (req: Request) => {
    const { id } = req.params;
    //@ts-ignore
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
    }

    const conversation = await Conversation.findById(id)
      .select('messages')
      .populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 },
        populate: { path: 'senderId' }
      });

    if (!conversation) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Conversation not found');
    }

    const lastMessage = conversation.messages[0] as any;

    if (
      !lastMessage ||
      lastMessage.senderId._id.toString() === userId.toString() ||
      lastMessage.isSeen
    ) {
      return;
    }

    lastMessage.isSeen = true;
    await lastMessage.save();

    const updatedMessage = await Message.findById(lastMessage._id);

    if (!updatedMessage) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Message not found');
    }

    await pusher.trigger(`conversation_${id}`, 'update_message', updatedMessage);
    await pusher.trigger(`conversations_user_${userId}`, 'update_conversation', {
      id,
      messages: [Transformer.transformObjectTypeSnakeToCamel(lastMessage)]
    });

    return { success: 'Message marked as seen' };
  };
}
