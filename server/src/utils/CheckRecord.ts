import { Model as MongooseModel, Document, Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import ApiError from './ApiError';

interface DocumentWithId extends Document {
  _id: Types.ObjectId;
}

interface Model {
  findOne: (query: Record<string, any>) => Promise<any>;
}

export const checkRecordByField = async (
  model: Model,
  field: string,
  value: any,
  wantExists: boolean = false,
  currentId: string | null = null
): Promise<void> => {
  try {
    const query: Record<string, any> = { [field]: value };
    if (currentId) {
      query._id = { $ne: currentId };
    }

    const record = await model.findOne(query);

    if (field === '_id') field = 'id';
    if (record) {
      if (!wantExists) {
        throw new ApiError(StatusCodes.CONFLICT, `Record with ${field}: ${value} already exists`);
      }
    }

    if (record === null && wantExists) {
      throw new ApiError(StatusCodes.BAD_REQUEST, `Record with ${field}: ${value} not found`);
    }
  } catch (error) {
    throw error;
  }
};

export const checkRecordsByIds = async <T extends DocumentWithId>(
  Model: MongooseModel<T>,
  ids: string[]
): Promise<void> => {
  const records = await Model.find({ _id: { $in: ids } }).select('_id');
  const foundIds = new Set(records.map((record) => record._id.toString()));

  for (const id of ids) {
    if (!foundIds.has(id)) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Record with _id ${id} not found in ${Model.collection.collectionName}`
      );
    }
  }
};
