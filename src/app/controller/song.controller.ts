import { NextFunction, Request, Response } from 'express';
import { MulterFields } from 'src/@types/multer';
import { SongQuery } from 'src/@types/query';

import { SongBody } from '../../@types/body';
import { BadRequestError } from '../error/badRequest.error';
import { SongService } from '../service/song.service';
import { CreateSongValidator } from '../validator/songs/create.validator';

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

      const song = await songService.upload(uuid, files);

      return res.json({
        status: 200,
        song: song,
      });
    } catch (error) {
      next(error);
    }
  }
}
