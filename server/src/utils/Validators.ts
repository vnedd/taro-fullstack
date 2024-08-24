import { ObjectSchema } from 'joi'

export const validateBeforeCreateOrUpdate = async <T>(correct_Condition: ObjectSchema<T>, data: T): Promise<T> => {
  return await correct_Condition.validateAsync(data, { abortEarly: false })
}
