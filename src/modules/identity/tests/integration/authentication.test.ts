import { createApp } from '@/api/api';
import { Problem, ValidationProblem } from '@/common/models';
import { AuthenticationBeginResponse } from '@/modules/identity/models/authentication.models';
import { createTestClientBasicAuthenticationToken } from '@/modules/identity/tests/helpers';
import { beforeAll, describe, expect, it } from 'bun:test';
import { Wallet, getIcapAddress } from 'ethers';
import { Express } from 'express';
import request from 'supertest';

describe('api/v1/authentication', () => {
  let app: Express;
  const baseUrl = '/api/v1/authentication';

  beforeAll(async () => {
    app = await createApp();
  });

  describe('POST /begin', () => {
    const url = `${baseUrl}/begin`;

    it('should return 200 OK', async () => {
      // arrange
      const { address: publicAddress } = Wallet.createRandom();

      // act
      const response = await request(app)
        .post(url)
        .set('Authorization', createTestClientBasicAuthenticationToken())
        .send({ publicAddress })
        .expect(200);

      // assert
      const { body }: { body: AuthenticationBeginResponse } = response;
      expect(response.headers['set-cookie']).not.toBeNil();
      expect(body).toMatchObject({
        publicAddress,
        nonce: expect.any(String),
      });
    });

    it('should return 200 OK and convert ICAP address to checksummed address', async () => {
      // arrange
      const { address: publicAddress } = Wallet.createRandom();
      const ICAPAddress = getIcapAddress(publicAddress);

      // act
      const response = await request(app)
        .post(url)
        .set('Authorization', createTestClientBasicAuthenticationToken())
        .send({ publicAddress: ICAPAddress })
        .expect(200);

      // assert
      const { body }: { body: AuthenticationBeginResponse } = response;
      expect(response.headers['set-cookie']).not.toBeNil();
      expect(body).toMatchObject({
        publicAddress,
        nonce: expect.any(String),
      });
    });

    it('should return 200 OK and convert lowercase address to checksummed address', async () => {
      // arrange
      const { address: publicAddress } = Wallet.createRandom();

      // act
      const response = await request(app)
        .post(url)
        .set('Authorization', createTestClientBasicAuthenticationToken())
        .send({ publicAddress: publicAddress.toLocaleLowerCase() })
        .expect(200);

      // assert
      const { body }: { body: AuthenticationBeginResponse } = response;
      expect(response.headers['set-cookie']).not.toBeNil();
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
        .set('Authorization', createTestClientBasicAuthenticationToken())
        .send({ publicAddress })
        .expect(400)
        .then((res) => res.body);

      // assert
      expect(response).not.toBeNil();
      expect(response.status).toBe(400);
      expect(response.errors).toMatchObject([
        {
          name: 'publicAddress',
          reason: 'Invalid public address',
        },
      ]);
    });

    it('should return 400 on invalid payload', async () => {
      // arrange
      const publicAddress = null;

      // act
      const response: ValidationProblem = await request(app)
        .post(url)
        .set('Authorization', createTestClientBasicAuthenticationToken())
        .send({ publicAddress })
        .expect(400)
        .then((res) => res.body);

      // assert
      expect(response).not.toBeNil();
      expect(response.status).toBe(400);
      expect(response.errors).toMatchObject([
        {
          name: '/body/publicAddress',
          reason: 'must be string',
        },
      ]);
    });

    it('should return 400 on missing authorization header', async () => {
      // arrange
      const publicAddress = '';

      // act
      const response: ValidationProblem = await request(app)
        .post(url)
        .send({ publicAddress })
        .expect(400)
        .then((res) => res.body);

      // assert
      expect(response).not.toBeNil();
      expect(response.detail).toBe(
        `request/headers must have required property 'authorization'`,
      );
    });

    it('should return 400 on missing client credentials', async () => {
      // arrange
      const publicAddress = '';

      // act
      const response: ValidationProblem = await request(app)
        .post(url)
        .set('Authorization', '')
        .send({ publicAddress })
        .expect(400)
        .then((res) => res.body);

      // assert
      expect(response).not.toBeNil();
      expect(response.detail).toBe(
        `request/headers/authorization must NOT have fewer than 1 characters`,
      );
    });

    it('should return 400 on invalid client auth scheme', async () => {
      // arrange
      const publicAddress = '';

      // act
      const response: ValidationProblem = await request(app)
        .post(url)
        .set('Authorization', 'Bearer boop:boop')
        .send({ publicAddress })
        .expect(400)
        .then((res) => res.body);

      // assert
      expect(response).not.toBeNil();
      expect(response.errors).toMatchObject([
        {
          name: 'request.headers.authorization',
          reason: 'Invalid authorization scheme',
        },
      ]);
    });

    it('should return 401 on invalid client credentials', async () => {
      // arrange
      const publicAddress = '';

      // act
      const response: Problem = await request(app)
        .post(url)
        .set('Authorization', 'Basic boop:boop')
        .send({ publicAddress })
        .expect(401)
        .then((res) => res.body);

      // assert
      expect(response).not.toBeNil();
      expect(response.detail).toBe('Invalid client credentials');
    });
  });
});
