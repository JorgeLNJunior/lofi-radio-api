import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import app from '../../src/start/app';
import { ArtistFactory } from './factory/artist.factory';
import { PlaylistFactory } from './factory/playlist.factory';
import { SongFactory } from './factory/song.factory';
import { sign } from './helpers/auth.helper';
import { finishConnection } from './helpers/database.helper';

describe('Playlists (e2e)', () => {
  let connection: Connection;
  const token = sign();

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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(playlist);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (POST) should not register a playlist without a song', async () => {
    const playlist = PlaylistFactory.aPlaylist().build();

    const { status, body } = await request(app)
      .post('/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send(playlist);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (POST) should not register a playlist with invalid song uuid', async () => {
    const playlist = PlaylistFactory.aPlaylist().withSongUuid('123').build();

    const { status, body } = await request(app)
      .post('/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send(playlist);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (PATCH) should update a playlist', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const song = await SongFactory.aSong().withArtist(artist).persist();
    const { uuid } = await PlaylistFactory.aPlaylist().withSong(song).persist();

    const dataToUpdate = PlaylistFactory.aPlaylist()
      .withoutSongsUuids()
      .build();

    const { status, body } = await request(app)
      .patch(`/playlists/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dataToUpdate);

    expect(status).toBe(200);
    expect(body.playlist.title).toBe(dataToUpdate.title);
    expect(body.playlist.originalUrl).toBe(dataToUpdate.originalUrl);
  });

  test('/artists (PATCH) should return 400 if playlist was not found', async () => {
    const uuid = 'invalid-uuid';

    const dataToUpdate = PlaylistFactory.aPlaylist()
      .withoutSongsUuids()
      .build();

    const { status, body } = await request(app)
      .patch(`/playlists/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dataToUpdate);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (PATCH) should not update a playlist with title length less then 3', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const song = await SongFactory.aSong().withArtist(artist).persist();
    const { uuid } = await PlaylistFactory.aPlaylist().withSong(song).persist();

    const dataToUpdate = PlaylistFactory.aPlaylist()
      .withoutSongsUuids()
      .withoutInvalidTitle()
      .build();

    const { status, body } = await request(app)
      .patch(`/playlists/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dataToUpdate);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  afterAll(async () => {
    await finishConnection(connection);
  });
});
