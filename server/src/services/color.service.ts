import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Color from '~/models/color.model';
import ApiError from '~/utils/ApiError';
import { checkRecordByField } from '~/utils/CheckRecord';
import { getFilterOptions, getPaginationOptions } from '~/utils/Pagination';
import { Transformer } from '~/utils/transformer';

export default class ColorService {
  static getAllColor = async (req: Request) => {
    const options = getPaginationOptions(req);
    const filter = getFilterOptions(req, ['name']);

    const paginatedColors = await Color.paginate(filter, options);

    const { docs, ...otherFields } = paginatedColors;

    const transformedColors = docs.map((color) => {
      return Transformer.transformObjectTypeSnakeToCamel(color.toObject());
    });
    const others = {
      ...otherFields
    };
    return {
      metaData: Transformer.removeDeletedField(transformedColors),
      others
    };
  };

  static getOneColor = async (req: Request) => {
    await checkRecordByField(Color, '_id', req.params.id, true);
    const data = await Color.findById(req.params.id);
    const color = Transformer.transformObjectTypeSnakeToCamel(data?.toObject());

    return color;
  };

  static createColor = async (req: Request) => {
    const { name, value } = req.body;
    await checkRecordByField(Color, 'name', name, false);

    const newColor = await Color.create({
      name,
      value
    });
    const data = Transformer.transformObjectTypeSnakeToCamel(newColor.toObject());

    return data;
  };

  static updateColor = async (req: Request) => {
    const { name, value } = req.body;

    await checkRecordByField(Color, '_id', req.params.id, true);

    const currentColor = await Color.findById(req.params.id);

    if (name && name !== currentColor?.name) {
      await checkRecordByField(Color, 'name', name, false, req.params.id);
    }

    const updateColor = await Color.findByIdAndUpdate(
      req.params.id,
      { name, value },
      { new: true, runValidators: true }
    );

    if (!updateColor) {
      throw new ApiError(StatusCodes.CONFLICT, 'This color is not available');
    }
    const responseData = Transformer.transformObjectTypeSnakeToCamel(updateColor.toObject());
    return responseData;
  };

  static deleteColor = async (req: Request) => {
    const { id } = req.params;
    await checkRecordByField(Color, '_id', id, true);

    await Color.findByIdAndDelete(id);
  };
}
