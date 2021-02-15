import { MulterFields } from 'src/@types/multer';
import { getRepository } from 'typeorm';

import { SongBody } from '../../@types/body';
import { Artist } from '../entity/artist.entity';
import { Song } from '../entity/song.entity';
import { BadRequestError } from '../error/badRequest.error';
import { SongsStorageFactory } from '../storage/factory/songFactory.storage';

export class SongService {
  async find(): Promise<Song[]> {
    const repository = getRepository(Song);
    return repository.find({ relations: ['artists'] });
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
      throw new BadRequestError(['one or more artists do not exist']);
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

    const song = files.song[0];
    const cover = files.cover[0];

    const songExist = await repository.findOne(songUuid);
    if (!songExist) throw new BadRequestError(['song not found']);

    const songUrl = await storage.storeSong(song);
    const coverUrl = await storage.storeCover(cover);

    await repository.update(songUuid, { coverurl: coverUrl, songUrl: songUrl });

    return repository.findOne(songUuid);
  }
}
