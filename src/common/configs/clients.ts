type Client = {
  clientId: string;
  clientSecret: string;
};

type ClientConfiguration = {
  allowedClients: Map<CLIENT_NAMES, Client>;
};

export type CLIENT_NAMES = 'test';

export const CLIENT_CONFIG: ClientConfiguration = {
  allowedClients: new Map<CLIENT_NAMES, Client>([
    [
      'test',
      {
        clientId: String(Bun.env.TEST_CLIENT_ID),
        clientSecret: String(Bun.env.TEST_CLIENT_SECRET),
      },
    ],
  ]),
};
