import { contextWrapMiddleware } from '@/common/middlewares/context-wrap.middleware';
import { authenticationBegin } from '@/modules/identity/handlers/authentication.handlers';
import { Router } from 'express';

export async function createAuthenticationRouter(): Promise<Router> {
  const router = Router();

  router.post('/begin', contextWrapMiddleware(authenticationBegin));

  return router;
}
