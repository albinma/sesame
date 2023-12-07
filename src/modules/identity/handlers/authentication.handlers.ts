import { $AuthenticationService } from '@/api/services';
import { ValidationError } from '@/common/errors/validation.error';
import {
  AuthenticationBeginRequest,
  AuthenticationBeginResponse,
} from '@/modules/identity/models/authentication.models';
import { isAddress } from 'ethers';
import { Request, Response } from 'express';

export const authenticationBegin = async (
  req: Request<unknown, unknown, AuthenticationBeginRequest>,
  res: Response<AuthenticationBeginResponse>,
): Promise<void> => {
  const { publicAddress: requestPublicAddress } = req.body;

  if (!isAddress(requestPublicAddress)) {
    throw new ValidationError('publicAddress', 'Invalid public address');
  }

  const { publicAddress, nonce } =
    $AuthenticationService.generateNonceFromPublicAddress(requestPublicAddress);

  res.send({
    publicAddress,
    nonce,
  });
};
