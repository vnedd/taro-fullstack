import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Product from '~/models/product.model';
import Variant, { IVariant } from '~/models/variant.model';
import ApiError from '~/utils/ApiError';
import { checkRecordByField } from '~/utils/CheckRecord';
import { generateSlug } from '~/utils/GenerateSlug';
import { getFilterOptions, getPaginationOptions } from '~/utils/Pagination';
import { Transformer } from '~/utils/transformer';

export default class ProductService {
  static getAllProducts = async (req: Request) => {
    const { get_all } = req.query;

    const filter = getFilterOptions(req, ['name']);

    let products;

    if (get_all === 'true') {
      products = await Product.find(filter);
      const transformedColors = products.map((product) => {
        return Transformer.transformObjectTypeSnakeToCamel(product.toObject());
      });
      return {
        metaData: Transformer.removeDeletedField(transformedColors),
        others: {}
      };
    }

    const options = getPaginationOptions(req);

    options.populate = [
      { path: 'category' },
      { path: 'product_sizes' },
      { path: 'product_colors' },
      { path: 'product_styles' },
      { path: 'variants' }
    ];

    products = await Product.paginate(filter, options);

    const { docs, ...otherFields } = products;

    const transformedColors = docs.map((product) => {
      return Transformer.transformObjectTypeSnakeToCamel(product.toObject());
    });

    return {
      metaData: Transformer.removeDeletedField(transformedColors),
      others: get_all === 'true' ? {} : otherFields
    };
  };

  static getProductLites = async (req: Request) => {
    const { get_all } = req.query;

    const filter = getFilterOptions(req, ['name']);

    let products;

    if (get_all === 'true') {
      products = await Product.find(filter);
      const transformedColors = products.map((product) => {
        return Transformer.transformObjectTypeSnakeToCamel(product.toObject());
      });
      return {
        metaData: Transformer.removeDeletedField(transformedColors),
        others: {}
      };
    }

    const options = getPaginationOptions(req);

    options.populate = [{ path: 'category' }];
    products = await Product.paginate(filter, options);

    const { docs, ...otherFields } = products;

    const transformedProducts = docs.map((product) => {
      return Transformer.transformObjectTypeSnakeToCamel(product.toObject());
    });

    return {
      metaData: Transformer.removeDeletedField(transformedProducts),
      others: get_all === 'true' ? {} : otherFields
    };
  };

  static getproductFeatured = async (req: Request) => {
    const products = await Product.find({
      isFeatured: true
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate([{ path: 'category' }]);

    const transformedProducts = products.map((product) => {
      return Transformer.transformObjectTypeSnakeToCamel(product.toObject());
    });
    return {
      metaData: Transformer.removeDeletedField(transformedProducts),
      others: {}
    };
  };

  static getOneProduct = async (req: Request) => {
    await checkRecordByField(Product, '_id', req.params.id, true);
    const data = await Product.findById(req.params.id).populate([
      { path: 'category' },
      { path: 'product_sizes' },
      { path: 'product_colors' },
      { path: 'product_styles' },
      { path: 'variants' }
    ]);
    const product = Transformer.transformObjectTypeSnakeToCamel(data?.toObject());

    return product;
  };

  static createProduct = async (req: Request) => {
    const { name, variants } = req.body;

    await checkRecordByField(Product, 'name', name, false);

    const slug = await generateSlug(Product, name);

    const newProduct = await Product.create({
      name,
      slug,
      ...req.body,
      variants: []
    });

    if (variants && variants.length > 0) {
      const createdVariants = await Promise.all(
        variants.map((variant: IVariant) => Variant.create({ ...variant }))
      );
      newProduct.variants = createdVariants.map((v) => v._id);
      await newProduct.save();
    }

    const data = Transformer.transformObjectTypeSnakeToCamel(newProduct.toObject());

    return data;
  };

  static updateProduct = async (req: Request) => {
    const { name, variants, ...restData } = req.body;

    const currentProduct = await Product.findById(req.params.id).populate('variants');

    if (!currentProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'This product is not available');
    }

    let slug = currentProduct.slug;

    if (name && name !== currentProduct?.name) {
      await checkRecordByField(Product, 'name', name, false, currentProduct._id as string);
      slug = await generateSlug(Product, name);
    }

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        ...restData
      },
      { new: true, runValidators: true }
    );

    if (!updateProduct) {
      throw new ApiError(StatusCodes.CONFLICT, 'Failed to update product');
    }

    if (variants) {
      const variantIds = await this.updateVariants(updateProduct, variants);
      updateProduct.variants = variantIds;
      await updateProduct.save();
    }

    const responseData = Transformer.transformObjectTypeSnakeToCamel(updateProduct.toObject());
    return responseData;
  };

  static deleteProduct = async (req: Request) => {
    const { id } = req.params;
    const currentProduct = await Product.findById(id);
    if (!currentProduct) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'This product is not available');
    }
    await Variant.deleteMany({ _id: { $in: currentProduct.variants } });
    await Product.findByIdAndDelete(id);
  };

  static async updateVariants(product: any, variants: any) {
    const existingVariantIds = product.variants.map((v: any) => v.toString());

    const updatedVariantIds = await Promise.all(
      variants.map(async (variant: any) => {
        if (variant._id) {
          const updatedVariant = await Variant.findByIdAndUpdate(
            variant._id,
            { ...variant },
            { new: true, runValidators: true }
          );
          return updatedVariant ? updatedVariant._id : null;
        } else {
          const newVariant = await Variant.create({ ...variant });
          return newVariant._id;
        }
      })
    );

    const validUpdatedVariantIds = updatedVariantIds.filter((id) => id !== null);

    const variantsToRemove = existingVariantIds.filter(
      (id: any) => !validUpdatedVariantIds.includes(id)
    );

    if (variantsToRemove.length > 0) {
      await Variant.deleteMany({ _id: { $in: variantsToRemove } });
    }

    return validUpdatedVariantIds;
  }
}
