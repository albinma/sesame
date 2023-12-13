import { CLIENT_CONFIGURATION } from '@/common/configs';
import { UnauthorizedError, ValidationError } from '@/common/errors';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export function clientBasicAuthenticationMiddleware(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw new ValidationError(
          'request.headers.authorization',
          'Authorization header is missing',
        );
      }

      const [scheme, token] = authorization.split(' ');
      if (scheme !== 'Basic' || !token) {
        throw new ValidationError(
          'request.headers.authorization',
          'Invalid authorization scheme',
        );
      }

      const [clientId, clientSecret] = Buffer.from(token, 'base64')
        .toString()
        .split(':');

      if (!clientId || !clientSecret) {
        throw new UnauthorizedError('Invalid client credentials');
      }

      const { allowedClients } = CLIENT_CONFIGURATION;
      const inAllowedClients = Array.from(allowedClients.values()).some(
        (c) => c.clientId === clientId && c.clientSecret === clientSecret,
      );

      if (!inAllowedClients) {
        throw new UnauthorizedError('Invalid client credentials');
      }

      if (!res.headersSent) {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
}
