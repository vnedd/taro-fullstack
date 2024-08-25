import express from 'express';
import { authMiddleware } from '~/middlewares/authMiddleware';
import sizeValidation from '~/validations/size.validation';
import { objectIdValidation } from '~/validations/objectId.validation';
import { SizeController } from '~/controllers/size.controller';

const sizeRouter = express.Router();

// get all size
sizeRouter.get('/', authMiddleware, SizeController.getAllSize);

// get one size by id
sizeRouter.get('/:id', objectIdValidation, authMiddleware, SizeController.getOneSize);

// create a new size
sizeRouter.post('/', authMiddleware, sizeValidation.createValidation, SizeController.createNewSize);

// update a size by id
sizeRouter.patch(
  '/:id',
  authMiddleware,
  objectIdValidation,
  sizeValidation.updateValidation,
  SizeController.updateSizeById
);

// delete a size by id
sizeRouter.delete('/:id', authMiddleware, objectIdValidation, SizeController.deleteSizeById);

export default sizeRouter;
