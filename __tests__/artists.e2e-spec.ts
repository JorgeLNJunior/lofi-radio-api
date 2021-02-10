import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import app from '../src/start/app';
import { UserFactory } from './factory/artist.factory';
import { finishConnection } from './helpers/database.helper';

describe('Users (e2e)', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  test('/users (GET) should return 200 and a list of artists', async () => {
    const { status, body } = await request(app).get('/artists');

    expect(status).toBe(200);
    expect(body).toHaveProperty('artists');
  });

  test('/users (POST) should register a artist, return 201 and a artist property', async () => {
    const artist = UserFactory.aArtist().build();

    const { status, body } = await request(app).post('/artists').send(artist);

    expect(status).toBe(201);
    expect(body).toHaveProperty('artist');
  });

  test('/notFound (GET) should return 404 if route does not exist', async () => {
    const { status } = await request(app).get('/notFound');

    expect(status).toBe(404);
  });

  afterAll(async () => {
    await finishConnection(connection);
  });
});
