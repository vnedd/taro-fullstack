import express from 'express';
import { authMiddleware } from '~/middlewares/authMiddleware';
import styleValidation from '~/validations/style.validation';
import { objectIdValidation } from '~/validations/objectId.validation';
import { StyleController } from '~/controllers/style.controller';

const styleRouter = express.Router();

// get all style
styleRouter.get('/', authMiddleware, StyleController.getAllStyle);

// get one style by id
styleRouter.get('/:id', objectIdValidation, authMiddleware, StyleController.getOneStyle);

// create a new style
styleRouter.post(
  '/',
  authMiddleware,
  styleValidation.createValidation,
  StyleController.createNewStyle
);

// update a style by id
styleRouter.patch(
  '/:id',
  authMiddleware,
  objectIdValidation,
  styleValidation.updateValidation,
  StyleController.updateStyleById
);

// delete a style by id
styleRouter.delete('/:id', authMiddleware, objectIdValidation, StyleController.deleteStyleById);

export default styleRouter;
