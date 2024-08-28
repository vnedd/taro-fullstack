import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  validateBeforeCreateOrUpdate
} from '~/utils/Validators';

class productValidation {
  static createValidation = async (req: Request, res: Response, next: NextFunction) => {
    const correctCondition = Joi.object({
      name: Joi.string().min(1).max(100).trim().required(),
      description: Joi.string().min(1).trim().required(),
      discount: Joi.number().min(0).max(100).default(0),
      isFeatured: Joi.boolean().default(false),
      category: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
      product_sizes: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
      ),
      product_colors: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
      ),
      product_styles: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
      ),
      images: Joi.array().items(Joi.string().uri()),
      variants: Joi.array().items(
        Joi.object({
          id: Joi.string().optional(),
          style: Joi.string(),
          size: Joi.string(),
          color: Joi.string(),
          styleName: Joi.string().min(1).trim().required(),
          colorName: Joi.string().min(1).trim().required(),
          sizeName: Joi.string().min(1).trim().required(),
          price: Joi.number().min(0).required(),
          stock: Joi.number().min(0).required()
        })
      )
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
      id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
      name: Joi.string().min(1).max(100).trim(),
      description: Joi.string().min(1).trim(),
      discount: Joi.number().min(0).max(100),
      isFeatured: Joi.boolean(),
      category: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      product_sizes: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
      ),
      product_colors: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
      ),
      product_styles: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
      ),
      images: Joi.array().items(Joi.string().uri()),
      variants: Joi.array().items(
        Joi.object({
          id: Joi.string().optional(),
          style: Joi.string(),
          size: Joi.string(),
          color: Joi.string(),
          styleName: Joi.string().min(1).trim(),
          colorName: Joi.string().min(1).trim(),
          sizeName: Joi.string().min(1).trim(),
          price: Joi.number().min(0),
          stock: Joi.number().min(0)
        })
      )
    });

    try {
      await validateBeforeCreateOrUpdate(correctCondition, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default productValidation;
