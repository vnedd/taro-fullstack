import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import TrackingService from '~/services/tracking.service';
import { SuccessResponse } from '~/utils/Response';

export class TrackingController {
  static createTracking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tracking = await TrackingService.createTracking(req);
      SuccessResponse(res, StatusCodes.OK, 'Create tracking successfully', tracking);
    } catch (error) {
      next(error);
    }
  };
}
