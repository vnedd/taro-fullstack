import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import SizeService from '~/services/size.service';
import { SuccessResponse } from '~/utils/Response';

export class SizeController {
  static createNewSize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSize = await SizeService.createSize(req);
      SuccessResponse(res, StatusCodes.OK, 'Create new size successfully', newSize);
    } catch (error) {
      next(error);
    }
  };

  static getAllSize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await SizeService.getAllSize(req);

      SuccessResponse(res, StatusCodes.OK, 'Get all size successfully', metaData, others);
    } catch (error) {
      next(error);
    }
  };

  static getOneSize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const size = await SizeService.getOneSize(req);

      SuccessResponse(res, StatusCodes.OK, 'Get one size successfully', size);
    } catch (error) {
      next(error);
    }
  };

  static updateSizeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateSize = await SizeService.updateSize(req);

      SuccessResponse(res, StatusCodes.OK, 'Update size successfully', updateSize);
    } catch (error) {
      next(error);
    }
  };

  static deleteSizeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await SizeService.deleteSize(req);

      SuccessResponse(res, StatusCodes.OK, 'Deleted size successfully', []);
    } catch (error) {
      next(error);
    }
  };
}
