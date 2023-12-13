import { errorHandlerMiddleware } from '@/common/middlewares';
import { createIdentityApi } from '@/modules/identity/api';
import express, { Express, json } from 'express';
import { middleware as OpenApiValidatorMiddlware } from 'express-openapi-validator';

const OPEN_API_SPEC = 'data/api-doc/v1.yml';

export const createApp = async (): Promise<Express> => {
  const app = express();

  app.use(json());

  // default route
  app.get('/', (req, res) => {
    res.status(200).end();
  });

  app.use(
    OpenApiValidatorMiddlware({
      apiSpec: OPEN_API_SPEC,
      validateApiSpec: false,
      validateRequests: true,
      validateResponses: true,
    }),
  );

  app.use('/api/v1', await createIdentityApi());
  app.use(errorHandlerMiddleware());

  return app;
};
