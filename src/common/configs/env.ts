declare module 'bun' {
  interface Env {
    HTTP_PORT: number;

    // Allowed Clients
    TEST_CLIENT_ID: string;
    TEST_CLIENT_SECRET: string;
  }
}
