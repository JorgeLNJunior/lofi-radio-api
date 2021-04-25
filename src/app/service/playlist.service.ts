import { getRepository } from 'typeorm';

import { PlaylistBody, PlaylistUpdateBody } from '../../@types/body';
import { PlaylistQuery } from '../../@types/query';
import { Playlist } from '../entity/playlist.entity';
import { Song } from '../entity/song.entity';
import { BadRequestError } from '../error/badRequest.error';
import { PlaylistQueryBuilder } from './query/playlistQueryBuilder';

export class PlaylistService {
  async find(query: PlaylistQuery): Promise<Playlist[]> {
    const repository = getRepository(Playlist);
    const findOptions = new PlaylistQueryBuilder(query).build();

    return repository.find(findOptions);
  }

  async create(body: PlaylistBody): Promise<Playlist | undefined> {
    const playlistRepository = getRepository(Playlist);
    const songRepository = getRepository(Song);

    if (!body.songsUuids) {
      throw new BadRequestError(['"songsUuids" is required']);
    }

    const songs: Song[] = [];

    for (const uuid of body.songsUuids) {
      const song = await songRepository.findOne(uuid);
      if (song) songs.push(song);
    }

    if (songs.length < body.songsUuids.length) {
      throw new BadRequestError(['one or more songs where not found']);
    }

    const playlist = playlistRepository.create({
      title: body.title,
      originalUrl: body.originalUrl,
      songs: songs,
    });

    const result = await playlistRepository.save(playlist);

    return playlistRepository.findOne(result.uuid, {
      relations: ['songs', 'songs.artists'],
    });
  }

  async update(
    uuid: string,
    body: PlaylistUpdateBody,
  ): Promise<Playlist | undefined> {
    const repository = getRepository(Playlist);

    const playlist = await repository.findOne(uuid);
    if (!playlist) throw new BadRequestError(['playlist not found']);

    await repository.update({ uuid: uuid }, body);

    return repository.findOne(uuid, { relations: ['songs', 'songs.artists'] });
  }

  async delete(uuid: string): Promise<void> {
    const repository = getRepository(Playlist);

    const playlist = await repository.findOne(uuid);
    if (!playlist) throw new BadRequestError(['playlist not found']);

    await repository.delete({ uuid: uuid });
  }
}
