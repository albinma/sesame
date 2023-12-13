import { AuthenticationService } from '@/modules/identity/services/authentication.service';
import { describe, expect, it } from 'bun:test';
import { Wallet, getIcapAddress } from 'ethers';

describe('modules/identity/services AuthenticationService', () => {
  describe('generateNonceFromPublicAddress', () => {
    it('should return public address and nonce', () => {
      // arrange
      const service = new AuthenticationService();
      const { address: publicAddress } = Wallet.createRandom();

      // act
      const result = service.generateNonceFromPublicAddress(publicAddress);

      // assert
      expect(result).toMatchObject({
        publicAddress,
        nonce: expect.any(String),
      });
    });

    it('should return public address and nonce with ICAP address', () => {
      // arrange
      const service = new AuthenticationService();
      const { address: publicAddress } = Wallet.createRandom();
      const ICAPAddress = getIcapAddress(publicAddress);

      // act
      const result = service.generateNonceFromPublicAddress(ICAPAddress);

      // assert
      expect(result).toMatchObject({
        publicAddress,
        nonce: expect.any(String),
      });
    });

    it('should return public address and nonce with lower-cased address', () => {
      // arrange
      const service = new AuthenticationService();
      const { address: publicAddress } = Wallet.createRandom();

      // act
      const result = service.generateNonceFromPublicAddress(
        publicAddress.toLocaleLowerCase(),
      );

      // assert
      expect(result).toMatchObject({
        publicAddress,
        nonce: expect.any(String),
      });
    });

    it('should throw error on invalid public address', () => {
      // arrange
      const service = new AuthenticationService();
      const publicAddress = 'invalid';

      // actssert
      expect(() =>
        service.generateNonceFromPublicAddress(publicAddress),
      ).toThrow('Invalid public address');
    });
  });
});
