import { createIdentityApi } from '@/modules/identity/api';
import express, { Express, json } from 'express';

export const createApp = async (): Promise<Express> => {
  const app = express();

  app.use(json());

  // default route
  app.get('/', (req, res) => {
    res.status(200).end();
  });

  app.use('/api/v1', await createIdentityApi());

  return app;
};
