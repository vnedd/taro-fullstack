import express from 'express';
import { authMiddleware } from '~/middlewares/authMiddleware';
import productValidation from '~/validations/product.validation';
import { objectIdValidation } from '~/validations/objectId.validation';
import { ProductController } from '~/controllers/product.controller';

const productRouter = express.Router();

// get all product
productRouter.get('/', ProductController.getAllProduct);

// get one product by id
productRouter.get('/:id', objectIdValidation, ProductController.getOneProduct);

// create a new product
productRouter.post(
  '/',
  authMiddleware,
  productValidation.createValidation,
  ProductController.createNewProduct
);

// update a product by id
productRouter.patch(
  '/:id',
  authMiddleware,
  objectIdValidation,
  productValidation.updateValidation,
  ProductController.updateProductById
);

// delete a product by id
productRouter.delete(
  '/:id',
  authMiddleware,
  objectIdValidation,
  ProductController.deleteProductById
);

export default productRouter;
