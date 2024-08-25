import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { validateBeforeCreateOrUpdate } from '~/utils/Validators';

class authValidation {
  static registerValidation = async (req: Request, res: Response, next: NextFunction) => {
    const correctCondition = Joi.object({
      username: Joi.string().min(3).max(20).trim().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().min(6).trim().required()
    });

    try {
      await validateBeforeCreateOrUpdate(correctCondition, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

  static loginValidation = async (req: Request, res: Response, next: NextFunction) => {
    const correctCondition = Joi.object({
      email: Joi.string().email().trim().required(),
      password: Joi.string().min(6).trim().required()
    });

    try {
      await validateBeforeCreateOrUpdate(correctCondition, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default authValidation;
