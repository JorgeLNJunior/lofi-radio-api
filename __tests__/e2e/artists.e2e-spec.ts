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

  test('/artists (POST) should register an artist', async () => {
    const artist = ArtistFactory.aArtist().build();

    const { status, body } = await request(app)
      .post('/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(artist);

    expect(status).toBe(201);
    expect(body).toHaveProperty('artist');
  });

  test('/artists (POST) should update the artist photo', async () => {
    const { uuid } = await ArtistFactory.aArtist().persist();

    const { status, body } = await request(app)
      .post(`/artists/${uuid}/upload`)
      .set('Authorization', `Bearer ${token}`)
      .attach('photo', __dirname + '/files/1.jpg');

    expect(status).toBe(200);
    expect(body).toHaveProperty('artist');
  });

  test('/artists (POST) should return and error if artist photo is not provided', async () => {
    const { uuid } = await ArtistFactory.aArtist().persist();

    const { status, body } = await request(app)
      .post(`/artists/${uuid}/upload`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

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

  test('/artists (PATCH) should update artist data', async () => {
    const dataToUpdate = ArtistFactory.aArtist().build();
    const { uuid } = await ArtistFactory.aArtist().persist();

    const { status, body } = await request(app)
      .patch(`/artists/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dataToUpdate);

    expect(status).toBe(200);
    expect(body.artist.name).toBe(dataToUpdate.name);
    expect(body.artist.soundcloudUrl).toBe(dataToUpdate.soundcloudUrl);
    expect(body.artist.spotifyUrl).toBe(dataToUpdate.spotifyUrl);
    expect(body.artist.youtubeUrl).toBe(dataToUpdate.youtubeUrl);
  });

  test('/artists (PATCH) should return 400 if the artist was not found', async () => {
    const dataToUpdate = ArtistFactory.aArtist().build();
    const uuid = 'invalid-uuid';

    const { status, body } = await request(app)
      .patch(`/artists/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dataToUpdate);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (PATCH) should not update an artist with invalid spotify url', async () => {
    const dataToUpdate = ArtistFactory.aArtist().withInvalidSpotify().build();
    const { uuid } = await ArtistFactory.aArtist().persist();

    const { status, body } = await request(app)
      .patch(`/artists/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dataToUpdate);

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('/artists (POST) should not register an artist if token is invalid', async () => {
    const artist = ArtistFactory.aArtist().build();

    const { status, body } = await request(app)
      .post('/artists')
      .set('Authorization', 'Bearer invalid-token')
      .send(artist);

    expect(status).toBe(401);
    expect(body).toHaveProperty('errors');
  });

  afterAll(async () => {
    await finishConnection(connection);
  });
});
