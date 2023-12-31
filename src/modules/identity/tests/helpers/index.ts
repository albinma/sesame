import { CLIENT_CONFIG, CLIENT_NAMES } from '@/common/configs';

export const createTestClientBasicAuthenticationToken = (): string =>
  createClientBasicAuthenticationToken('test');

export const createClientBasicAuthenticationToken = (
  name: CLIENT_NAMES,
): string => {
  const client = CLIENT_CONFIG.allowedClients.get('test');

  if (client) {
    const { clientId, clientSecret } = client;
    return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    )}`;
  }

  throw new Error(`Client ${name} not found`);
};
