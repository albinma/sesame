import { createAuthenticationRouter } from '@/modules/identity/routers/authentication.router';
import { Router } from 'express';

export async function createIdentityApi(): Promise<Router> {
  const router = Router();

  router.use('/auth', await createAuthenticationRouter());

  return router;
}
