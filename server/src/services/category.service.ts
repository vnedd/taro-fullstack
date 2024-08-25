import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Category from '~/models/category.model';
import ApiError from '~/utils/ApiError';
import { checkRecordByField } from '~/utils/CheckRecord';
import { getFilterOptions, getPaginationOptions } from '~/utils/Pagination';
import { Transformer } from '~/utils/transformer';

export default class CategoryService {
  static getAllCategory = async (req: Request) => {
    const options = getPaginationOptions(req);
    const filter = getFilterOptions(req, ['name']);

    const paginatedCategories = await Category.paginate(filter, options);

    const { docs, ...otherFields } = paginatedCategories;

    const transformedCategorys = docs.map((cate) => {
      return Transformer.transformObjectTypeSnakeToCamel(cate.toObject());
    });
    const others = {
      ...otherFields
    };
    return {
      metaData: Transformer.removeDeletedField(transformedCategorys),
      others
    };
  };

  static getOneCategory = async (req: Request) => {
    await checkRecordByField(Category, '_id', req.params.id, true);
    const data = await Category.findById(req.params.id);
    const brand = Transformer.transformObjectTypeSnakeToCamel(data?.toObject());

    return brand;
  };

  static createCategory = async (req: Request) => {
    const { name, image_url, description } = req.body;
    await checkRecordByField(Category, 'name', name, false);

    const newCategory = await Category.create({
      name,
      image_url,
      description
    });
    const data = Transformer.transformObjectTypeSnakeToCamel(newCategory.toObject());

    return data;
  };

  static updateCategory = async (req: Request) => {
    const { name, image_url, description } = req.body;

    await checkRecordByField(Category, '_id', req.params.id, true);

    const currentCategory = await Category.findById(req.params.id);

    if (name && name !== currentCategory?.name) {
      await checkRecordByField(Category, 'name', name, false, req.params.id);
    }

    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, image_url, description },
      { new: true, runValidators: true }
    );

    if (!updateCategory) {
      throw new ApiError(StatusCodes.CONFLICT, 'This brand is not available');
    }
    const responseData = Transformer.transformObjectTypeSnakeToCamel(updateCategory.toObject());
    return responseData;
  };

  static deleteCategory = async (req: Request) => {
    const { id } = req.params;
    await checkRecordByField(Category, '_id', id, true);

    await Category.findByIdAndDelete(id);
  };
}
