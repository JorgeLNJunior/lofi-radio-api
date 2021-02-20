import { NextFunction, Request, Response } from 'express';

import { JWT } from '../auth/jwt';

export class AuthController {
  async sign(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const auth = new JWT();

      const { password } = req.body;

      const token = auth.sign({ password });

      return res.json({
        status: 200,
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }
}
