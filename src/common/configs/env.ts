declare module 'bun' {
  interface Env {
    // HTTP server configurations
    HTTP_PORT: number;
    HTTP_SESSION_COOKIE_SECRET: string;
    HTTP_SESSION_COOKIE_HTTP_ONLY: boolean;
    HTTP_SESSION_COOKIE_SECURE: boolean;
    HTTP_SESSION_COOKIE_SAMESITE: boolean;
    HTTP_SESSION_COOKIE_MAX_AGE_SECONDS: number;

    // Allowed Clients
    TEST_CLIENT_ID: string;
    TEST_CLIENT_SECRET: string;
  }
}

import { toBoolean } from '@/common/utils/primitives';
import joi from 'joi';

const schema = joi.object({
  environment: joi
    .string()
    .valid('development', 'production', 'test')
    .default('development'),
  timezone: joi.string().required().default('UTC'),
  http: joi
    .object({
      port: joi.number().required().default(8080),
      session: joi.object({
        name: joi.string().required(),
        cookie: joi.object({
          secret: joi.string().required(),
          httpOnly: joi.boolean().required().default(true),
          secure: joi.boolean().required().default(false),
          sameSite: joi.string().required().default('strict'),
          maxAgeSeconds: joi.number().required(),
        }),
      }),
    })
    .required(),
});

export const APP_CONFIG = {
  environment: String(Bun.env.NODE_ENV),
  timezone: String(Bun.env.TZ),
  http: {
    port: Number(Bun.env.HTTP_PORT),
    session: {
      name: String(Bun.env.HTTP_SESSION_NAME),
      cookie: {
        secret: String(Bun.env.HTTP_SESSION_COOKIE_SECRET),
        httpOnly: toBoolean(Bun.env.HTTP_SESSION_COOKIE_HTTP_ONLY),
        secure: toBoolean(Bun.env.HTTP_SESSION_COOKIE_SECURE) as
          | boolean
          | 'auto'
          | undefined,
        sameSite: String(Bun.env.HTTP_SESSION_COOKIE_SAMESITE) as
          | boolean
          | 'strict'
          | 'lax'
          | 'none',
        maxAgeSeconds: Number(Bun.env.HTTP_SESSION_COOKIE_MAX_AGE_SECONDS),
      },
    },
  },
};

const { error } = schema
  .prefs({ errors: { label: 'key' } })
  .validate(APP_CONFIG);

if (error) {
  throw new Error(`App config validation error: ${error.message}`);
}
