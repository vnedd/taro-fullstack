import { ObjectSchema } from 'joi';

export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/;
export const OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern!';

export const validateBeforeCreateOrUpdate = async <T>(correct_Condition: ObjectSchema<T>, data: T): Promise<T> => {
  return await correct_Condition.validateAsync(data, { abortEarly: false });
};
