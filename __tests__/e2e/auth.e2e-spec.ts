import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import app from '../../src/start/app';
import { finishConnection } from './helpers/database.helper';

describe('Auth (e2e)', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  test('/sign (POST) should return a jwt token', async () => {
    const password = process.env.ADMIN_PASS;
    const { status, body } = await request(app)
      .post('/sign')
      .send({ password });

    expect(status).toBe(200);
    expect(body).toHaveProperty('token');
  });

  test('/sign (POST) should not authenticate if password is undefined', async () => {
    const { status, body } = await request(app).post('/sign');

    expect(status).toBe(401);
    expect(body).toHaveProperty('errors');
  });

  test('/sign (POST) should not authenticate if password is invalid', async () => {
    const password = 'invalid-pass';
    const { status, body } = await request(app)
      .post('/sign')
      .send({ password });

    expect(status).toBe(401);
    expect(body).toHaveProperty('errors');
  });

  afterAll(async () => {
    await finishConnection(connection);
  });
});
