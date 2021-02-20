import { Router } from 'express';
import multer from 'multer';

import { UsersController } from './app/controller/artists.controller';
import { AuthController } from './app/controller/auth.controller';
import { PlaylistController } from './app/controller/playlist.controller';
import { SongController } from './app/controller/song.controller';
import { verifyToken } from './app/middleware/auth.middleware';

const router = Router();
const authController = new AuthController();
const artistsController = new UsersController();
const songController = new SongController();
const playlistsController = new PlaylistController();

// auth
router.post('/sign', authController.sign);

// artists
router.get('/artists/', artistsController.get);

router.post('/artists', verifyToken, artistsController.create);

router.post(
  '/artists/:uuid/upload',
  verifyToken,
  multer({ limits: { fieldSize: 2000000 } }).single('photo'),
  artistsController.uploadPhoto,
);

// songs
router.get('/songs', songController.find);

router.post('/songs', verifyToken, songController.create);

router.post(
  '/songs/:uuid/upload',
  verifyToken,
  multer().fields([
    { name: 'song', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  songController.upload,
);

// playlists
router.get('/playlists/', playlistsController.find);

router.post('/playlists', verifyToken, playlistsController.create);

export default router;
