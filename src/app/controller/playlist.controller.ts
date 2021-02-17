import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '../error/badRequest.error';
import { PlaylistService } from '../service/playlist.service';
import { CreatePlaylistValidator } from '../validator/playlists/create.validator';

export class PlaylistController {
  async find(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const playlistService = new PlaylistService();

      const playlists = await playlistService.find();

      return res.json({
        status: 200,
        playlists: playlists,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const playlistService = new PlaylistService();
      const validator = new CreatePlaylistValidator();
      const body = req.body;

      const { value, error } = validator.validate(body);

      if (error) throw new BadRequestError([error.message]);

      const playlist = await playlistService.create(value);

      return res.status(201).json({
        status: 201,
        playlist: playlist,
      });
    } catch (error) {
      next(error);
    }
  }
}
