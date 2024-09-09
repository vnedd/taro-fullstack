import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MessageService from '~/services/message.service';
import { SuccessResponse } from '~/utils/Response';

export default class MessageController {
  static createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMessage = await MessageService.createMessage(req);
      SuccessResponse(res, StatusCodes.CREATED, 'Create new message successfully', newMessage);
    } catch (error) {
      next(error);
    }
  };
}
