import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import ProductService from '~/services/product.service';
import { SuccessResponse } from '~/utils/Response';

export class ProductController {
  static createNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProduct = await ProductService.createProduct(req);
      SuccessResponse(res, StatusCodes.OK, 'Create new product successfully', newProduct);
    } catch (error) {
      next(error);
    }
  };

  static getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await ProductService.getAllProducts(req);

      SuccessResponse(res, StatusCodes.OK, 'Get all product successfully', metaData, others);
    } catch (error) {
      next(error);
    }
  };

  static getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await ProductService.getOneProduct(req);

      SuccessResponse(res, StatusCodes.OK, 'Get one product successfully', product);
    } catch (error) {
      next(error);
    }
  };

  static updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateProduct = await ProductService.updateProduct(req);

      SuccessResponse(res, StatusCodes.OK, 'Update product successfully', updateProduct);
    } catch (error) {
      next(error);
    }
  };

  static deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ProductService.deleteProduct(req);

      SuccessResponse(res, StatusCodes.OK, 'Deleted product successfully', []);
    } catch (error) {
      next(error);
    }
  };
}
