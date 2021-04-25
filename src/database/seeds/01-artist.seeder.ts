import * as Faker from 'faker';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Artist } from '../../app/entity/artist.entity';

export class ArtistSeeder implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    for (let i = 0; i <= 10; i++) {
      await connection.getRepository(Artist).save({
        name: Faker.name.findName(),
        soundcloudUrl: `http://soundcloud.com/${Faker.lorem.word(5)}`,
        spotifyUrl: `http://open.spotify.com/artist/${Faker.lorem.word(5)}`,
        youtubeUrl: `http://youtube.com/channel/${Faker.lorem.word(5)}`,
        photoUrl: Faker.internet.avatar(),
        isHidden: false,
      });
    }
  }
}
