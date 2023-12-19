import { createSession } from '@/common/initializers/session';
import {
  clientBasicAuthenticationMiddleware,
  contextWrapMiddleware,
} from '@/common/middlewares';
import { authenticationBegin } from '@/modules/identity/handlers/authentication.handlers';
import { Router } from 'express';

export async function createAuthenticationRouter(): Promise<Router> {
  const router = Router();
  router.use(createSession());
  router.use(clientBasicAuthenticationMiddleware());
  router.post('/begin', contextWrapMiddleware(authenticationBegin));

  return router;
}
