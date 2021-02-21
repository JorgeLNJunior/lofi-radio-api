import request from 'supertest';

import app from '../../src/start/app';

describe('Other (e2e)', () => {
  test('/notFound (GET) should return 404 if route does not exist', async () => {
    const { status } = await request(app).get('/notFound');

    expect(status).toBe(404);
  });
});
