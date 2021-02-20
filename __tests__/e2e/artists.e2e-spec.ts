import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import app from '../../src/start/app';
import { ArtistFactory } from './factory/artist.factory';
import { sign } from './helpers/auth.helper';
import { finishConnection } from './helpers/database.helper';

describe('Artists (e2e)', () => {
  let connection: Connection;
  const token = sign();

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  test('/artists (GET) should return a list of artists', async () => {
    const { status, body } = await request(app).get('/artists/');

    expect(status).toBe(200);
    expect(body).toHaveProperty('artists');
  });

  test('/artists (POST) should register a artist', async () => {
    const artist = ArtistFactory.aArtist().build();

    const { status, body } = await request(app)
      .post('/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(artist);

    expect(status).toBe(201);
    expect(body).toHaveProperty('artist');
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // test('/artists (POST) should update artist photo', async () => {
  //   const { uuid } = await ArtistFactory.aArtist().persist();

  //   const { status, body } = await request(app)
  //     .post(`/artists/${uuid}/upload`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .attach('photo', __dirname + '/files/1.jpg');

  //   expect(status).toBe(200);
  //   expect(body).toHaveProperty('artist');
  // });

  test('/artists (POST) should not register a artist if name is undefined', async () => {
    const artist = ArtistFactory.aArtist().withoutName().build();

    const { status, body } = await request(app)
      .post('/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(artist);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (POST) should not register a artist with invalid spotify', async () => {
    const artist = ArtistFactory.aArtist().withInvalidSpotify().build();

    const { status, body } = await request(app)
      .post('/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(artist);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (POST) should not register a artist with invalid youtube', async () => {
    const artist = ArtistFactory.aArtist().withInvalidYoutube().build();

    const { status, body } = await request(app)
      .post('/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(artist);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (POST) should not register a artist with invalid soundcloud', async () => {
    const artist = ArtistFactory.aArtist().withInvalidSoundcloud().build();

    const { status, body } = await request(app)
      .post('/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(artist);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/notFound (GET) should return 404 if route does not exist', async () => {
    const { status } = await request(app).get('/notFound');

    expect(status).toBe(404);
  });

  afterAll(async () => {
    await finishConnection(connection);
  });
});
