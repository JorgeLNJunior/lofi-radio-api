import { NextFunction, Request, Response } from 'express';

import { SongBody, SongUpdateBody } from '../../@types/body';
import { MulterFields } from '../../@types/multer';
import { SongQuery } from '../../@types/query';
import { BadRequestError } from '../error/badRequest.error';
import { SongService } from '../service/song.service';
import { CreateSongValidator } from '../validator/songs/create.validator';
import { UpdateSongValidator } from '../validator/songs/update.validator';

export class SongController {
  async find(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const songService = new SongService();

      const query = req.query;
      const songs = await songService.find(query as SongQuery);

      return res.json({
        status: 200,
        songs: songs,
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
    const songService = new SongService();
    const validator = new CreateSongValidator();
    const body = req.body;

    const { value, error: validationError } = validator.validate(body);

    try {
      if (validationError) throw new BadRequestError([validationError.message]);

      const song = await songService.create(value as SongBody);

      return res.status(201).json({
        status: 201,
        song: song,
      });
    } catch (error) {
      next(error);
    }
  }

  async upload(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const songService = new SongService();
      const files = req.files as MulterFields;
      const { uuid } = req.params;

      if (!files) throw new BadRequestError(['"song" and "cover" is required']);

      const song = await songService.upload(uuid, files);

      return res.json({
        status: 200,
        song: song,
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
    const songService = new SongService();
    const validator = new UpdateSongValidator();
    const body = req.body;
    const { uuid } = req.params;

    const { value, error: validationError } = validator.validate(body);

    try {
      if (validationError) throw new BadRequestError([validationError.message]);

      const song = await songService.update(uuid, value as SongUpdateBody);

      return res.status(200).json({
        status: 200,
        song: song,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const songService = new SongService();
    const { uuid } = req.params;

    try {
      await songService.delete(uuid);

      return res.status(200).json({
        status: 200,
        message: 'song deleted',
      });
    } catch (error) {
      next(error);
    }
  }
}
