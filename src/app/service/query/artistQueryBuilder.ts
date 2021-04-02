import { FindConditions, FindManyOptions, ILike } from 'typeorm';

import { ArtistQuery } from '../../../@types/query';
import { Artist } from '../../entity/artist.entity';

export class ArtistQueryBuilder {
  constructor(query: ArtistQuery) {
    this.query = query;
  }

  private query;

  build(): FindManyOptions<Artist> {
    const conditions: FindConditions<Artist> = {};
    if (this.query.uuid) conditions.uuid = this.query.uuid;
    if (this.query.name) conditions.name = ILike(`%${this.query.name}%`);
    conditions.isHidden = false;

    const findOptions: FindManyOptions<Artist> = {
      take: this.query.limit || 20,
      where: conditions,
    };

    return findOptions;
  }
}
