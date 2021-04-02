import { PlaylistBody } from 'src/@types/body';
import { PlaylistQuery } from 'src/@types/query';
import { getRepository } from 'typeorm';

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
      throw new BadRequestError(['one or more song do not exist']);
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
}
