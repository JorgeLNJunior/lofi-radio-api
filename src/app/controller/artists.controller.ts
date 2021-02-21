import { NextFunction, Request, Response } from 'express';
import { ArtistQuery } from 'src/@types/query';

import { BadRequestError } from '../error/badRequest.error';
import { ArtistsService } from '../service/artists.service';
import { CreateArtistValidator } from '../validator/artists/create.validator';

export class ArtistController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const artistsService = new ArtistsService();

      const query = req.query;
      const artists = await artistsService.get(query as ArtistQuery);

      return res.json({
        status: 200,
        artists: artists,
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
    const artistsService = new ArtistsService();
    const body = req.body;
    const validator = new CreateArtistValidator();

    const { error, value } = validator.validate(body);

    try {
      if (error) throw new BadRequestError([error.message]);
      const artist = await artistsService.create(value);

      return res.status(201).json({
        status: 201,
        artist: artist,
      });
    } catch (error) {
      next(error);
    }
  }

  async uploadPhoto(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const artistsService = new ArtistsService();
    const photo = req.file;
    const { uuid } = req.params;

    try {
      const artist = await artistsService.uploadPhoto(photo, uuid);

      return res.json({
        status: 200,
        artist: artist,
      });
    } catch (error) {
      next(error);
    }
  }
}
