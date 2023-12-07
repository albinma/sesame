import { createApp } from '@/global/initializers/app';
import { describe, expect, it } from 'bun:test';
import request from 'supertest';

describe('app.test.ts', () => {
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
});
