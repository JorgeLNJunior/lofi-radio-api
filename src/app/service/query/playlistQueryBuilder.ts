import { FindConditions, FindManyOptions, ILike } from 'typeorm';

import { PlaylistQuery } from '../../../@types/query';
import { Playlist } from '../../entity/playlist.entity';

export class PlaylistQueryBuilder {
  constructor(query: PlaylistQuery) {
    this.query = query;
  }

  private query;

  build(): FindManyOptions<Playlist> {
    const conditions: FindConditions<Playlist> = {};
    if (this.query.uuid) conditions.uuid = this.query.uuid;
    if (this.query.title) conditions.title = ILike(`%${this.query.title}%`);

    return {
      relations: ['songs', 'songs.artists'],
      take: this.query.limit || 20,
      where: conditions,
    } as FindManyOptions<Playlist>;
  }
}
