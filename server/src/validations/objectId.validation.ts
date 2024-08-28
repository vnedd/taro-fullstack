import Joi from 'joi';
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  validateBeforeCreateOrUpdate
} from '~/utils/Validators';
import { NextFunction, Request, Response } from 'express';

export const objectIdValidation = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object({
    id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  });

  try {
    await validateBeforeCreateOrUpdate(correctCondition, req.params);
    next();
  } catch (error) {
    next(error);
  }
};
