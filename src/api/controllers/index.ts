import { $AuthenticationService } from '@/api/services';
import { AuthenticationController } from '@/modules/identity/controllers/authentication.controller';

export const $AuthenticationController = new AuthenticationController(
  $AuthenticationService,
);
