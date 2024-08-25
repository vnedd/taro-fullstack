import express from 'express';
import { ColorController } from '~/controllers/color.controller';
import { authMiddleware } from '~/middlewares/authMiddleware';
import colorValidation from '~/validations/color.validation';
import { objectIdValidation } from '~/validations/objectId.validation';

const colorRouter = express.Router();

// get all color
colorRouter.get('/', authMiddleware, ColorController.getAllColor);

// get one color by id
colorRouter.get('/:id', objectIdValidation, authMiddleware, ColorController.getOneColor);

// create a new color
colorRouter.post('/', authMiddleware, colorValidation.createValidation, ColorController.createNewColor);

// update a color by id
colorRouter.patch(
  '/:id',
  authMiddleware,
  objectIdValidation,
  colorValidation.updateValidation,
  ColorController.updateColorById
);

// delete a color by id
colorRouter.delete('/:id', authMiddleware, objectIdValidation, ColorController.deleteColorById);

export default colorRouter;
