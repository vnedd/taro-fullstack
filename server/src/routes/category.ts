import express from 'express';
import { CategoryController } from '~/controllers/category.controller';
import { authMiddleware } from '~/middlewares/authMiddleware';
import categoryValidation from '~/validations/category.validation';
import { objectIdValidation } from '~/validations/objectId.validation';

const categoryRouter = express.Router();

// get all category
categoryRouter.get('/', authMiddleware, CategoryController.getAllCategory);

// get one category by id
categoryRouter.get('/:id', objectIdValidation, authMiddleware, CategoryController.getOneCategory);

// create a new category
categoryRouter.post('/', authMiddleware, categoryValidation.createValidation, CategoryController.createNewCategory);

// update a category by id
categoryRouter.patch(
  '/:id',
  authMiddleware,
  objectIdValidation,
  categoryValidation.updateValidation,
  CategoryController.updateCategoryById
);

// delete a category by id
categoryRouter.delete('/:id', authMiddleware, objectIdValidation, CategoryController.deleteCategoryById);

export default categoryRouter;
