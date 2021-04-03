import { FindConditions, FindManyOptions, ILike } from 'typeorm';

import { SongQuery } from '../../../@types/query';
import { Song } from '../../entity/song.entity';

export class SongQueryBuilder {
  constructor(query: SongQuery) {
    this.query = query;
  }

  private query;

  build(): FindManyOptions<Song> {
    const conditions: FindConditions<Song> = {};
    if (this.query.uuid) conditions.uuid = this.query.uuid;
    if (this.query.title) conditions.title = ILike(`%${this.query.title}%`);
    conditions.isHidden = false;

    return {
      relations: ['artists'],
      take: this.query.limit || 20,
      where: conditions,
    } as FindManyOptions<Song>;
  }
}
