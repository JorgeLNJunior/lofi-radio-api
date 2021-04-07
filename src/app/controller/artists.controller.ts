import { NextFunction, Request, Response } from 'express';

import { ArtistQuery } from '../../@types/query';
import { BadRequestError } from '../error/badRequest.error';
import { ArtistsService } from '../service/artists.service';
import { CreateArtistValidator } from '../validator/artists/create.validator';
import { UpdateArtistValidator } from '../validator/artists/update.validator';

export class ArtistController {
  async get(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const artistsService = new ArtistsService();

      const query = req.query;
      const artists = await artistsService.find(query as ArtistQuery);

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
    const body = req.body;
    const artistsService = new ArtistsService();
    const validator = new CreateArtistValidator();

    const { error: validationError, value } = validator.validate(body);

    try {
      if (validationError) throw new BadRequestError([validationError.message]);
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

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const body = req.body;
    const { uuid } = req.params;
    const artistsService = new ArtistsService();
    const validator = new UpdateArtistValidator();

    const { error: validationError, value } = validator.validate(body);

    try {
      if (validationError) throw new BadRequestError([validationError.message]);
      const artist = await artistsService.update(uuid, value);

      return res.status(200).json({
        status: 200,
        artist: artist,
      });
    } catch (error) {
      next(error);
    }
  }
}
