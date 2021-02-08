import { Router } from 'express';

import { AuthController } from './app/controller/auth.controller';
import { UsersController } from './app/controller/users.controller';
import { validateToken } from './app/middleware/auth.middleware';

const router = Router();
const usersController = new UsersController();
const authController = new AuthController();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/users', validateToken, usersController.get);

export default router;
