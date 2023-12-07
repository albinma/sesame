import { $AuthenticationController } from '@/api/controllers';
import { Router } from 'express';

export async function createAuthenticationRouter(): Promise<Router> {
  const router = Router();

  router.post('/begin', $AuthenticationController.begin);

  return router;
}
