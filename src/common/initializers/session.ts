import { APP_CONFIG } from '@/common/configs/env';
import { RequestHandler } from 'express';
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    nonce: string;
  }
}

export const createSession = (): RequestHandler => {
  return session({
    store: new session.MemoryStore(),
    name: APP_CONFIG.http.session.name,
    secret: APP_CONFIG.http.session.cookie.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: APP_CONFIG.http.session.cookie.httpOnly,
      maxAge: APP_CONFIG.http.session.cookie.maxAgeSeconds * 1000,
      secure: APP_CONFIG.http.session.cookie.secure,
      sameSite: APP_CONFIG.http.session.cookie.sameSite,
    },
  });
};
