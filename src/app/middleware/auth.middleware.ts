import { NextFunction, Request, Response } from 'express';

import { JWT } from '../auth/jwt';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | undefined => {
  const jwt = new JWT();
  const token = req.headers.authorization;

  try {
    jwt.verify(token);
    next();
  } catch (error) {
    return res.status(error.status || '500').json({
      status: error.status || 500,
      message: error.message,
      errors: error.errors || [],
    });
  }
};
