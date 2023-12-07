import { createApp } from '@/api';
import { ValidationProblem } from '@/common/models';
import { AuthenticationBeginResponse } from '@/modules/identity/models/authentication.models';
import { beforeAll, describe, expect, it } from 'bun:test';
import { Wallet } from 'ethers';
import { Express } from 'express';
import request from 'supertest';

describe('/authentication', () => {
  let app: Express;

  beforeAll(async () => {
    app = await createApp();
  });

  describe('POST /begin', () => {
    const url = '/api/v1/authentication/begin';

    it('should return 200 OK', async () => {
      // arrange
      const { address: publicAddress } = Wallet.createRandom();

      // act
      const response = await request(app)
        .post(url)
        .send({ publicAddress })
        .expect(200);

      // assert
      const { body }: { body: AuthenticationBeginResponse } = response;
      expect(body).toMatchObject({
        publicAddress,
        nonce: expect.any(String),
      });
    });

    it('should return 400 Bad Request because of invalid public address', async () => {
      // arrange
      const publicAddress = 'invalid';

      // act
      const response: ValidationProblem = await request(app)
        .post(url)
        .send({ publicAddress })
        .expect(400)
        .then((res) => res.body);

      // assert
      expect(response.status).toBe(400);
      expect(response.errors).toHaveLength(1);
      expect(
        response.errors?.every(
          (e) =>
            e.name === 'publicAddress' && e.reason === 'Invalid public address',
        ),
      ).toBeTruthy();
    });
  });
});
