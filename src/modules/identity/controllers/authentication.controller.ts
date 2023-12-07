import { AuthenticationService } from '@/modules/identity/services/authentication.service';
import { Request, Response } from 'express';

export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async begin(req: Request, res: Response): Promise<void> {
    res.status(200).end();
  }
}
