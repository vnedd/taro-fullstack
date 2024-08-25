import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import ColorService from '~/services/color.service';
import { SuccessResponse } from '~/utils/Response';

export class ColorController {
  static createNewColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newColor = await ColorService.createColor(req);
      SuccessResponse(res, StatusCodes.OK, 'Create new color successfully', newColor);
    } catch (error) {
      next(error);
    }
  };

  static getAllColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await ColorService.getAllColor(req);

      SuccessResponse(res, StatusCodes.OK, 'Get all color successfully', metaData, others);
    } catch (error) {
      next(error);
    }
  };

  static getOneColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const color = await ColorService.getOneColor(req);

      SuccessResponse(res, StatusCodes.OK, 'Get one color successfully', color);
    } catch (error) {
      next(error);
    }
  };

  static updateColorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateColor = await ColorService.updateColor(req);

      SuccessResponse(res, StatusCodes.OK, 'Update color successfully', updateColor);
    } catch (error) {
      next(error);
    }
  };

  static deleteColorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ColorService.deleteColor(req);

      SuccessResponse(res, StatusCodes.OK, 'Deleted color successfully', []);
    } catch (error) {
      next(error);
    }
  };
}
