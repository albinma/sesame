import { logger } from '@/common/initializers/logger';
import { errorHandlerMiddleware } from '@/common/middlewares';
import { createIdentityApi } from '@/modules/identity/api';
import express, { Express, json } from 'express';
import { middleware as OpenApiValidatorMiddlware } from 'express-openapi-validator';
import pinoHttp from 'pino-http';

const OPEN_API_SPEC = 'data/api-doc/v1.yml';

export const createApp = async (): Promise<Express> => {
  const app = express();

  // For when the app is behind a proxy, like in a docker container or in a kubernetes cluster.
  app.set('trust proxy', 1);

  // Generate request id that will correlate all logs for a single request.
  app.use((req, res, next) => {
    req.id = crypto.randomUUID();
    res.set('X-Request-Id', req.id);
    next();
  });

  app.use(
    pinoHttp({
      logger,
      quietReqLogger: true,
      genReqId: (req) => req.id,
    }),
  );

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
