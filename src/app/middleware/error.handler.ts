import { NextFunction, Request, Response } from 'express';

import { errorLogger } from '../../config/logger';
import { HttpError } from '../error/http.error';

export const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): unknown => {
  const response = {
    status: error.status || 500,
    message: error.status !== undefined ? error.message : 'internal error',
    errors: error.errors || [],
  };

  if (response.status === 500) errorLogger.log('error', error.message);

  return res.status(response.status).json(response);
};
