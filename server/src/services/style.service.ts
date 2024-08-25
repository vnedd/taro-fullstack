import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import Style from '~/models/style.model';
import ApiError from '~/utils/ApiError';
import { checkRecordByField } from '~/utils/CheckRecord';
import { getFilterOptions, getPaginationOptions } from '~/utils/Pagination';
import { Transformer } from '~/utils/transformer';

export default class StyleService {
  static getAllStyle = async (req: Request) => {
    const options = getPaginationOptions(req);
    const filter = getFilterOptions(req, ['name']);

    const paginatedStyles = await Style.paginate(filter, options);

    const { docs, ...otherFields } = paginatedStyles;

    const transformedStyles = docs.map((style) => {
      return Transformer.transformObjectTypeSnakeToCamel(style.toObject());
    });
    const others = {
      ...otherFields
    };
    return {
      metaData: Transformer.removeDeletedField(transformedStyles),
      others
    };
  };

  static getOneStyle = async (req: Request) => {
    await checkRecordByField(Style, '_id', req.params.id, true);
    const data = await Style.findById(req.params.id);
    const style = Transformer.transformObjectTypeSnakeToCamel(data?.toObject());

    return style;
  };

  static createStyle = async (req: Request) => {
    const { name, description } = req.body;
    await checkRecordByField(Style, 'name', name, false);

    const newStyle = await Style.create({
      name,
      description
    });
    const data = Transformer.transformObjectTypeSnakeToCamel(newStyle.toObject());

    return data;
  };

  static updateStyle = async (req: Request) => {
    const { name, description } = req.body;

    await checkRecordByField(Style, '_id', req.params.id, true);

    const currentStyle = await Style.findById(req.params.id);

    if (name && name !== currentStyle?.name) {
      await checkRecordByField(Style, 'name', name, false, req.params.id);
    }

    const updateStyle = await Style.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updateStyle) {
      throw new ApiError(StatusCodes.CONFLICT, 'This style is not available');
    }
    const responseData = Transformer.transformObjectTypeSnakeToCamel(updateStyle.toObject());
    return responseData;
  };

  static deleteStyle = async (req: Request) => {
    const { id } = req.params;
    await checkRecordByField(Style, '_id', id, true);

    await Style.findByIdAndDelete(id);
  };
}