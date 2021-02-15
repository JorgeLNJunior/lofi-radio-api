import { Router } from 'express';
import multer from 'multer';

import { UsersController } from './app/controller/artists.controller';
import { SongController } from './app/controller/song.controller';

const router = Router();
const artistsController = new UsersController();
const songController = new SongController();

router.get('/artists/', artistsController.get);

router.post('/artists', artistsController.create);

router.post(
  '/artists/:uuid/photo',
  multer({ limits: { fieldSize: 2000000 } }).single('photo'),
  artistsController.uploadPhoto,
);

router.get('/songs', songController.find);

router.post('/songs', songController.create);

router.post(
  '/songs/:uuid/upload',
  multer().fields([
    { name: 'song', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  songController.upload,
);

export default router;
