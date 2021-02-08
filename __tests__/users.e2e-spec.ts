import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import { User } from '../src/app/entity/user.entity';
import app from '../src/start/app';
import { UserFactory } from './factory/user.factory';
import { generateToken } from './helpers/auth.helper';
import { finishConnection } from './helpers/database.helper';

describe('Users (e2e)', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  test('/users (GET) should return 200 and users property', async () => {
    const user = UserFactory.aUser().build();
    const token = generateToken(user as User);

    const { status, body } = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('users');
  });

  test('/users (GET) should return 401 if token is not provided', async () => {
    const { status } = await request(app).get('/users');

    expect(status).toBe(401);
  });

  test('/users (GET) should return 401 if token is invalid', async () => {
    const token = 'invalid-token';

    const { status } = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(401);
  });

  test('/notFound (GET) should return 404 if route does not exist', async () => {
    const { status } = await request(app).get('/notFound');

    expect(status).toBe(404);
  });

  afterAll(async () => {
    await finishConnection(connection);
  });
});
