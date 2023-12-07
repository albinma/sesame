import { $AuthenticationController } from '@/api/controllers';
import { Router } from 'express';

export async function createAuthenticationRouter(): Promise<Router> {
  const router = Router();

  router.get('/', $AuthenticationController.begin);

  return router;
}
