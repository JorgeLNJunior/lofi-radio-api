import Faker from 'faker';
import { getRepository } from 'typeorm';

import { PlaylistBody } from '../../../src/@types/body';
import { Playlist } from '../../../src/app/entity/playlist.entity';
import { Song } from '../../../src/app/entity/song.entity';

export class PlaylistFactory {
  private playlist: PlaylistBody = {
    title: Faker.lorem.word(5),
    originalUrl: Faker.internet.url(),
    songsUuids: [],
  };

  static aPlaylist(): PlaylistFactory {
    return new PlaylistFactory();
  }

  withSong(song: Song): PlaylistFactory {
    if (this.playlist.songsUuids) {
      this.playlist.songsUuids.push(song.uuid);
    }
    return this;
  }

  withoutTitle(): PlaylistFactory {
    delete this.playlist.title;
    return this;
  }

  async persist(): Promise<Playlist> {
    if (!this.playlist.songsUuids || this.playlist.songsUuids.length <= 0) {
      throw new Error('Test Error: a playlist must have a song');
    }

    const playlistRepository = getRepository(Playlist);
    const songRepository = getRepository(Song);

    const songs: Song[] = [];

    for (const uuid of this.playlist.songsUuids) {
      const song = await songRepository.findOne(uuid);
      if (song) songs.push(song);
    }

    const playlist = playlistRepository.create({
      title: this.playlist.title,
      originalUrl: this.playlist.originalUrl,
      songs: songs,
    });

    return playlistRepository.save(playlist);
  }

  build(): PlaylistBody {
    return this.playlist;
  }
}
