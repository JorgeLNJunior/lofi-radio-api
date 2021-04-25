import { MulterFields } from 'src/@types/multer';
import { SongQuery } from 'src/@types/query';
import { getRepository } from 'typeorm';

import { SongBody, SongUpdateBody } from '../../@types/body';
import { Artist } from '../entity/artist.entity';
import { Song } from '../entity/song.entity';
import { BadRequestError } from '../error/badRequest.error';
import { SongsStorageFactory } from '../storage/factory/songFactory.storage';
import { SongQueryBuilder } from './query/songQueryBuilder';

export class SongService {
  async find(query: SongQuery): Promise<Song[]> {
    const repository = getRepository(Song);
    const findOptions = new SongQueryBuilder(query).build();

    return repository.find(findOptions);
  }

  async create(body: SongBody): Promise<Song | undefined> {
    const artistRepository = getRepository(Artist);
    const songRepository = getRepository(Song);

    if (!body.artistsUuids) return;

    const artists: Artist[] = [];

    for (const uuid of body.artistsUuids) {
      const artist = await artistRepository.findOne(uuid);
      if (artist) artists.push(artist);
    }

    if (artists.length < body.artistsUuids.length) {
      throw new BadRequestError(['one or more artists were not found']);
    }

    const song = songRepository.create({
      artists: artists,
      title: body.title,
    });
    return songRepository.save(song);
  }

  async upload(
    songUuid: string,
    files: MulterFields,
  ): Promise<Song | undefined> {
    const storage = new SongsStorageFactory().create();
    const repository = getRepository(Song);

    const songFile = files.song[0];
    const coverFile = files.cover[0];

    const song = await repository.findOne(songUuid);
    if (!song) throw new BadRequestError(['song not found']);

    if (song.coverUrl) await storage.deleteCover(song.coverUrl);
    if (song.songUrl) await storage.deleteSong(song.songUrl);

    const songUrl = await storage.storeSong(songFile);
    const coverUrl = await storage.storeCover(coverFile);

    await repository.update(songUuid, {
      coverUrl: coverUrl,
      songUrl: songUrl,
      isHidden: false,
    });

    return repository.findOne(songUuid, { relations: ['artists'] });
  }

  async update(uuid: string, body: SongUpdateBody): Promise<Song | undefined> {
    const repository = getRepository(Song);

    const song = await repository.findOne(uuid);
    if (!song) throw new BadRequestError(['song not found']);

    await repository.update({ uuid: uuid }, body);

    return repository.findOne(uuid, { relations: ['artists'] });
  }

  async delete(uuid: string): Promise<void> {
    const repository = getRepository(Song);

    const song = await repository.findOne(uuid);
    if (!song) throw new BadRequestError(['song not found']);

    await repository.delete({ uuid: uuid });
  }
}
