import * as Faker from 'faker';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Artist } from '../../app/entity/artist.entity';
import { Song } from '../../app/entity/song.entity';

export class SongSeeder implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const serverHost = process.env.HOST;

    const artists = await connection.getRepository(Artist).find();

    for (let i = 0; i <= 10; i++) {
      await connection.getRepository(Song).save({
        artists: [artists[i] || artists[0]],
        title: Faker.lorem.word(5),
        songUrl: `http://${serverHost}/songs/files/${Faker.datatype.uuid()}`,
        coverUrl: Faker.image.avatar(),
        isHidden: false,
      });
    }
  }
}
