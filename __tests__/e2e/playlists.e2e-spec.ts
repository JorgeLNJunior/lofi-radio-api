import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import app from '../../src/start/app';
import { ArtistFactory } from './factory/artist.factory';
import { PlaylistFactory } from './factory/playlist.factory';
import { SongFactory } from './factory/song.factory';
import { finishConnection } from './helpers/database.helper';

describe('Artists (e2e)', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  test('/artists (GET) should return a list of playlists', async () => {
    const { status, body } = await request(app).get('/playlists/');

    expect(status).toBe(200);
    expect(body).toHaveProperty('playlists');
  });

  test('/artists (POST) should register a playlist', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const song = await SongFactory.aSong().withArtist(artist).persist();
    const playlist = PlaylistFactory.aPlaylist().withSong(song).build();

    const { status, body } = await request(app)
      .post('/playlists')
      .send(playlist);

    expect(status).toBe(201);
    expect(body).toHaveProperty('playlist');
  });

  test('/artists (POST) should not register a playlist without a title', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const song = await SongFactory.aSong().withArtist(artist).persist();
    const playlist = PlaylistFactory.aPlaylist()
      .withSong(song)
      .withoutTitle()
      .build();

    const { status, body } = await request(app)
      .post('/playlists')
      .send(playlist);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (POST) should not register a playlist without a song', async () => {
    const playlist = PlaylistFactory.aPlaylist().build();

    const { status, body } = await request(app)
      .post('/playlists')
      .send(playlist);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  afterAll(async () => {
    await finishConnection(connection);
  });
});