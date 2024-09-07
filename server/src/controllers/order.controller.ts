import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import OrderService from '~/services/order.service';
import { SuccessResponse } from '~/utils/Response';

export class OrderController {
  static getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await OrderService.getAllOrder(req);

      SuccessResponse(res, StatusCodes.OK, 'Get all order successfully', metaData, others);
    } catch (error) {
      next(error);
    }
  };

  static getOneOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await OrderService.getOneOrder(req);

      SuccessResponse(res, StatusCodes.OK, 'Get one order successfully', order);
    } catch (error) {
      next(error);
    }
  };
  static getOrderByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await OrderService.getOrderByUser(req);

      SuccessResponse(res, StatusCodes.OK, 'Get orders by user successfully', metaData, others);
    } catch (error) {
      next(error);
    }
  };

  static updateShipingInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateOrder = await OrderService.updateShipingInfo(req);

      SuccessResponse(res, StatusCodes.OK, 'Update order successfully', updateOrder);
    } catch (error) {
      next(error);
    }
  };
  static updateOrderState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateOrder = await OrderService.updateOrderState(req);

      SuccessResponse(res, StatusCodes.OK, 'Update order successfully', updateOrder);
    } catch (error) {
      next(error);
    }
  };

  static canceledOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateOrder = await OrderService.canceledOrder(req);

      SuccessResponse(res, StatusCodes.OK, 'Update order successfully', updateOrder);
    } catch (error) {
      next(error);
    }
  };

  static deleteOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await OrderService.DeletedOrder(req);

      SuccessResponse(res, StatusCodes.OK, 'Deleted order successfully', []);
    } catch (error) {
      next(error);
    }
  };
}
