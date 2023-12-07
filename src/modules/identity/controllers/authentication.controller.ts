import {
  AuthenticationBeginRequest,
  AuthenticationBeginResponse,
} from '@/modules/identity/models/authentication.models';
import { AuthenticationService } from '@/modules/identity/services/authentication.service';
import { Request, Response } from 'express';

export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async begin(
    req: Request<unknown, unknown, AuthenticationBeginRequest>,
    res: Response<AuthenticationBeginResponse>,
  ): Promise<void> {
    res.status(200).end();
  }
}
