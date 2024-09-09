import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ConversationService from '~/services/conversation.service';
import { SuccessResponse } from '~/utils/Response';

export default class ConversationController {
  static createNewConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newConv = await ConversationService.createConversation(req);
      SuccessResponse(res, StatusCodes.OK, 'Create new category successfully', newConv);
    } catch (error) {
      next(error);
    }
  };

  static getConversationByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await ConversationService.getConversationByUser(req);
      SuccessResponse(
        res,
        StatusCodes.OK,
        'Get conversation by user successfully',
        metaData,
        others
      );
    } catch (error) {
      next(error);
    }
  };

  static getConversationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conv = await ConversationService.getConversationById(req);
      SuccessResponse(res, StatusCodes.OK, 'Get conversation by id successfully', conv);
    } catch (error) {
      next(error);
    }
  };

  static makeSeenedMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conv = await ConversationService.makeSeenMessage(req);
      SuccessResponse(res, StatusCodes.OK, 'Message seended', conv);
    } catch (error) {
      next(error);
    }
  };
}
