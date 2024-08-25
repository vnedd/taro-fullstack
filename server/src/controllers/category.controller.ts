import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import CategoryService from '~/services/category.service';
import { SuccessResponse } from '~/utils/Response';

export class CategoryController {
  static createNewCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCategory = await CategoryService.createCategory(req);
      SuccessResponse(res, StatusCodes.OK, 'Create new category successfully', newCategory);
    } catch (error) {
      next(error);
    }
  };

  static getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { metaData, others } = await CategoryService.getAllCategory(req);

      SuccessResponse(res, StatusCodes.OK, 'Get all category successfully', metaData, others);
    } catch (error) {
      next(error);
    }
  };

  static getOneCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await CategoryService.getOneCategory(req);

      SuccessResponse(res, StatusCodes.OK, 'Get one category successfully', category);
    } catch (error) {
      next(error);
    }
  };

  static updateCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateCategory = await CategoryService.updateCategory(req);

      SuccessResponse(res, StatusCodes.OK, 'Update category successfully', updateCategory);
    } catch (error) {
      next(error);
    }
  };

  static deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await CategoryService.deleteCategory(req);

      SuccessResponse(res, StatusCodes.OK, 'Deleted category successfully', []);
    } catch (error) {
      next(error);
    }
  };
}
