import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import app from '../../src/start/app';
import { ArtistFactory } from './factory/artist.factory';
import { SongFactory } from './factory/song.factory';
import { sign } from './helpers/auth.helper';
import { finishConnection } from './helpers/database.helper';

describe('Songs (e2e)', () => {
  let connection: Connection;
  const token = sign();

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  test('/songs (GET) should return a list of songs', async () => {
    const { status, body } = await request(app).get('/songs/');

    expect(status).toBe(200);
    expect(body).toHaveProperty('songs');
  });

  test('/songs (POST) should create a song', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const song = SongFactory.aSong().withArtist(artist).build();

    const { status, body } = await request(app)
      .post('/songs')
      .set('Authorization', `Bearer ${token}`)
      .send(song);

    expect(status).toBe(201);
    expect(body).toHaveProperty('song');
  });

  test('/songs (POST) should not create a song without a title', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const song = SongFactory.aSong().withArtist(artist).withoutTitle().build();

    const { status, body } = await request(app)
      .post('/songs')
      .set('Authorization', `Bearer ${token}`)
      .send(song);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/songs (POST) should not create a song without a artist', async () => {
    const song = SongFactory.aSong().build();

    const { status, body } = await request(app)
      .post('/songs')
      .set('Authorization', `Bearer ${token}`)
      .send(song);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/songs (POST) should upload the song file and cover', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const { uuid } = await SongFactory.aSong().withArtist(artist).persist();

    const { status, body } = await request(app)
      .post(`/songs/${uuid}/upload`)
      .set('Authorization', `Bearer ${token}`)
      .attach('song', __dirname + '/files/2.mp3')
      .attach('cover', __dirname + '/files/1.jpg');

    expect(status).toBe(200);
    expect(body).toHaveProperty('song');
  });

  test('/songs (POST) should return an error if file or cover is not provided', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const { uuid } = await SongFactory.aSong().withArtist(artist).persist();

    const { status, body } = await request(app)
      .post(`/songs/${uuid}/upload`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/songs (PATCH) should update a song', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const { uuid } = await SongFactory.aSong().withArtist(artist).persist();
    const dataToUpdate = SongFactory.aSong().build();

    const { status, body } = await request(app)
      .patch(`/songs/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dataToUpdate);

    expect(status).toBe(200);
    expect(body.song.title).toBe(dataToUpdate.title);
  });

  test('/songs (PATCH) should return 400 if the song was not found', async () => {
    const uuid = 'invalid-uuid';
    const dataToUpdate = SongFactory.aSong().build();

    const { status, body } = await request(app)
      .patch(`/songs/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dataToUpdate);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/songs (PATCH) should update a song if the title is not a string', async () => {
    const artist = await ArtistFactory.aArtist().persist();
    const { uuid } = await SongFactory.aSong().withArtist(artist).persist();
    const dataToUpdate = SongFactory.aSong().build();

    const { status, body } = await request(app)
      .patch(`/songs/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 123, artistsUuids: dataToUpdate.artistsUuids });

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  afterAll(async () => {
    await finishConnection(connection);
  });
});
