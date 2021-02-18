import { Router } from 'express';
import multer from 'multer';

import { UsersController } from './app/controller/artists.controller';
import { PlaylistController } from './app/controller/playlist.controller';
import { SongController } from './app/controller/song.controller';

const router = Router();
const artistsController = new UsersController();
const songController = new SongController();
const playlistsController = new PlaylistController();

router.get('/artists/', artistsController.get);

router.post('/artists', artistsController.create);

router.post(
  '/artists/:uuid/upload',
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

router.get('/playlists/', playlistsController.find);

router.post('/playlists', playlistsController.create);

export default router;
