import { getRepository } from 'typeorm';

import { ArtistBody } from '../../@types/body';
import { ArtistQuery } from '../../@types/query';
import { Artist } from '../entity/artist.entity';
import { BadRequestError } from '../error/badRequest.error';
import { ArtistStorageFactory } from '../storage/factory/artistFactory.storage';
import { ArtistQueryBuilder } from './query/artistQueryBuilder';

export class ArtistsService {
  async get(query: ArtistQuery): Promise<Artist[]> {
    const repository = getRepository(Artist);
    const findOptions = new ArtistQueryBuilder(query).build();

    return await repository.find(findOptions);
  }

  async create(artist: ArtistBody): Promise<Artist> {
    const repository = getRepository(Artist);

    const artistExist = await repository.findOne({ name: artist.name });
    if (artistExist) throw new BadRequestError(['"name" must be unique']);

    return repository.save(artist);
  }

  async uploadPhoto(photo: Express.Multer.File, uuid: string): Promise<Artist> {
    const storage = new ArtistStorageFactory().create();
    const repository = getRepository(Artist);

    const url = await storage.storePhoto(photo);

    let artist = await repository.findOne(uuid);
    if (!artist) throw new BadRequestError(['artist not found']);

    await repository.update(uuid, { photoUrl: url, isHidden: false });
    artist = await repository.findOne(uuid);
    return artist as Artist;
  }
}
