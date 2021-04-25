import * as Faker from 'faker';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Playlist } from '../../app/entity/playlist.entity';
import { Song } from '../../app/entity/song.entity';

export class PlaylistSeeder implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const songs = await connection.getRepository(Song).find();

    for (let i = 0; i <= 5; i++) {
      await connection.getRepository(Playlist).save({
        title: Faker.lorem.word(5),
        originalUrl: Faker.internet.url(),
        songs: songs,
      });
    }
  }
}
