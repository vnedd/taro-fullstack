import { Response } from 'express';

export const SuccessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  metaData: any,
  other: Record<string, any> = {}
): void => {
  res.status(statusCode).json({
    message: message,
    statusCode: statusCode,
    metaData: metaData,
    ...other
  });
};
