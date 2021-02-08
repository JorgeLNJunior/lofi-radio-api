import { NextFunction, Request, Response } from 'express';

import { UsersService } from '../service/users.service';

export class UsersController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const usersService = new UsersService();
      const users = await usersService.get();

      return res.json({
        status: 200,
        users: users,
      });
    } catch (error) {
      next(error);
    }
  }
}
