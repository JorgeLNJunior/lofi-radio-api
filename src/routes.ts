import { Router } from 'express';
import multer from 'multer';

import { UsersController } from './app/controller/artists.controller';

const router = Router();
const artistsController = new UsersController();

router.get('/artists', artistsController.get);

router.post('/artists', artistsController.create);

router.post(
  '/artists/:uuid/photo',
  multer({ limits: { fieldSize: 2000000 } }).single('photo'),
  artistsController.uploadPhoto,
);

export default router;
