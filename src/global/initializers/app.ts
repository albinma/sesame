import express, { Express } from 'express';

export const createApp = async (): Promise<Express> => {
  const app = express();

  // default route
  app.get('/', (req, res) => {
    res.status(200).end();
  });

  return app;
};
