import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  statusCode?: number
}

export const errorHandlingMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode]
  }

  res.status(responseError.statusCode).json(responseError)
}
