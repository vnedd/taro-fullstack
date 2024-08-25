import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import StyleService from '~/services/style.service';
import { SuccessResponse } from '~/utils/Response';

export class StyleController {
  static createNewStyle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newStyle = await StyleService.createStyle(req);
      SuccessResponse(res, StatusCodes.OK, 'Create new style successfully', newStyle);
    } catch (error) {
      next(error);
    }
  };

  static getAllStyle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await StyleService.getAllStyle(req);

      SuccessResponse(res, StatusCodes.OK, 'Get all style successfully', metaData, others);
    } catch (error) {
      next(error);
    }
  };

  static getOneStyle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const style = await StyleService.getOneStyle(req);

      SuccessResponse(res, StatusCodes.OK, 'Get one style successfully', style);
    } catch (error) {
      next(error);
    }
  };

  static updateStyleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateStyle = await StyleService.updateStyle(req);

      SuccessResponse(res, StatusCodes.OK, 'Update style successfully', updateStyle);
    } catch (error) {
      next(error);
    }
  };

  static deleteStyleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await StyleService.deleteStyle(req);

      SuccessResponse(res, StatusCodes.OK, 'Deleted style successfully', []);
    } catch (error) {
      next(error);
    }
  };
}
