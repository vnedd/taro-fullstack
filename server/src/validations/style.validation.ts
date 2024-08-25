import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE, validateBeforeCreateOrUpdate } from '~/utils/Validators';

class styleValidation {
  static createValidation = async (req: Request, res: Response, next: NextFunction) => {
    const correctCondition = Joi.object({
      name: Joi.string().min(3).trim().required(),
      description: Joi.string()
    });

    try {
      await validateBeforeCreateOrUpdate(correctCondition, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

  static updateValidation = async (req: Request, res: Response, next: NextFunction) => {
    const correctCondition = Joi.object({
      id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).optional(),
      name: Joi.string().min(3).trim().required(),
      description: Joi.string()
    });

    try {
      await validateBeforeCreateOrUpdate(correctCondition, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default styleValidation;
