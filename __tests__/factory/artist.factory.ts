import Faker from 'faker';
import { getRepository } from 'typeorm';

import { ArtistBody } from '../../src/@types/body';
import { Artist } from '../../src/app/entity/artist.entity';

export class UserFactory {
  private artist: ArtistBody = {
    name: Faker.name.findName(),
    spotifyUrl: `https://www.open.spotify.com/artist/${Faker.random.alphaNumeric()}`,
    soundcloudUrl: `https://www.soundcloud.com/${Faker.random.alphaNumeric()}`,
    youtubeUrl: `https://www.youtube.com/channel/${Faker.random.alphaNumeric()}`,
  };

  static aArtist(): UserFactory {
    return new UserFactory();
  }

  async persist(): Promise<Artist> {
    const repository = getRepository(Artist);
    const artist = repository.create(this.artist);
    return await repository.save(artist);
  }

  build(): ArtistBody {
    return this.artist;
  }
}
