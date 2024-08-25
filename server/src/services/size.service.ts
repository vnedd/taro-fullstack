import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Size from '~/models/size.model';
import ApiError from '~/utils/ApiError';
import { checkRecordByField } from '~/utils/CheckRecord';
import { getFilterOptions, getPaginationOptions } from '~/utils/Pagination';
import { Transformer } from '~/utils/transformer';

export default class SizeService {
  static getAllSize = async (req: Request) => {
    const options = getPaginationOptions(req);
    const filter = getFilterOptions(req, ['name']);

    const paginatedSizes = await Size.paginate(filter, options);

    const { docs, ...otherFields } = paginatedSizes;

    const transformedSizes = docs.map((size) => {
      return Transformer.transformObjectTypeSnakeToCamel(size.toObject());
    });
    const others = {
      ...otherFields
    };
    return {
      metaData: Transformer.removeDeletedField(transformedSizes),
      others
    };
  };

  static getOneSize = async (req: Request) => {
    await checkRecordByField(Size, '_id', req.params.id, true);
    const data = await Size.findById(req.params.id);
    const size = Transformer.transformObjectTypeSnakeToCamel(data?.toObject());

    return size;
  };

  static createSize = async (req: Request) => {
    const { name, value } = req.body;
    await checkRecordByField(Size, 'name', name, false);

    const newSize = await Size.create({
      name,
      value
    });
    const data = Transformer.transformObjectTypeSnakeToCamel(newSize.toObject());

    return data;
  };

  static updateSize = async (req: Request) => {
    const { name, value } = req.body;

    await checkRecordByField(Size, '_id', req.params.id, true);

    const currentSize = await Size.findById(req.params.id);

    if (name && name !== currentSize?.name) {
      await checkRecordByField(Size, 'name', name, false, req.params.id);
    }

    const updateSize = await Size.findByIdAndUpdate(req.params.id, { name, value }, { new: true, runValidators: true });

    if (!updateSize) {
      throw new ApiError(StatusCodes.CONFLICT, 'This size is not available');
    }
    const responseData = Transformer.transformObjectTypeSnakeToCamel(updateSize.toObject());
    return responseData;
  };

  static deleteSize = async (req: Request) => {
    const { id } = req.params;
    await checkRecordByField(Size, '_id', id, true);

    await Size.findByIdAndDelete(id);
  };
}
