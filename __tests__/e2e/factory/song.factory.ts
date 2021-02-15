import Faker from 'faker';
import { getRepository } from 'typeorm';

import { SongBody } from '../../../src/@types/body';
import { Artist } from '../../../src/app/entity/artist.entity';
import { Song } from '../../../src/app/entity/song.entity';

export class SongFactory {
  private song: SongBody = {
    title: Faker.lorem.word(),
    artistsUuids: [],
  };

  static aSong(): SongFactory {
    return new SongFactory();
  }

  withArtist(artist: Artist): SongFactory {
    if (this.song.artistsUuids) this.song.artistsUuids.push(artist.uuid);
    return this;
  }

  withoutTitle(): SongFactory {
    delete this.song.title;
    return this;
  }

  async persist(): Promise<Song> {
    if (!this.song.artistsUuids || this.song.artistsUuids.length <= 0) {
      throw new Error('Test Error: a song must have an artist');
    }
    const songRepository = getRepository(Song);
    const artistRepository = getRepository(Artist);

    const artists: Artist[] = [];

    for (const uuid of this.song.artistsUuids) {
      const artist = await artistRepository.findOne(uuid);
      if (artist) artists.push(artist);
    }

    const song = songRepository.create({
      artists: artists,
      title: this.song.title,
    });

    return songRepository.save(song);
  }

  build(): SongBody {
    return this.song;
  }
}
