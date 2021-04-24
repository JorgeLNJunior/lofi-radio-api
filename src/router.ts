import { Router } from 'express';
import multer from 'multer';

import { ArtistController } from './app/controller/artists.controller';
import { AuthController } from './app/controller/auth.controller';
import { PlaylistController } from './app/controller/playlist.controller';
import { SongController } from './app/controller/song.controller';
import { verifyToken } from './app/middleware/auth.middleware';

const router = Router();
const authController = new AuthController();
const artistsController = new ArtistController();
const songsController = new SongController();
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

router.patch('/artists/:uuid', verifyToken, artistsController.update);

// songs
router.get('/songs', songsController.find);

router.post('/songs', verifyToken, songsController.create);

router.post(
  '/songs/:uuid/upload',
  verifyToken,
  multer({ limits: { fileSize: 8000000 } }).fields([
    { name: 'song', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  songsController.upload,
);

router.patch('/songs/:uuid', verifyToken, songsController.update);

// playlists
router.get('/playlists/', playlistsController.find);

router.post('/playlists', verifyToken, playlistsController.create);

router.patch('/playlists/:uuid', verifyToken, playlistsController.update);

export default router;
