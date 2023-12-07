import { ServiceError } from '@/common/errors/service.error';
import { getAddress, isAddress } from 'ethers';
import { generateNonce } from 'siwe';

export class AuthenticationService {
  generateNonceFromPublicAddress(unsanitizedPublicAddress: string): {
    publicAddress: string;
    nonce: string;
  } {
    if (!isAddress(unsanitizedPublicAddress)) {
      throw new ServiceError('Invalid public address');
    }

    const publicAddress = getAddress(unsanitizedPublicAddress);
    const nonce = generateNonce();

    return {
      publicAddress,
      nonce,
    };
  }
}
