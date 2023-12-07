import { createApp } from '@/app/routes';
import { describe, expect, it } from 'bun:test';
import request from 'supertest';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    // arrange
    const app = await createApp();

    // act
    const response = await request(app).get('/');

    // assert
    expect(response.status).toBe(200);
  });
});
