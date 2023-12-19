import { APP_CONFIG } from '@/common/configs/env';
import { Logger, LoggerOptions, pino } from 'pino';

const createLogger = (options: LoggerOptions): Logger => {
  if (!options.level) {
    options.level = 'info';
  }

  return pino(options);
};

const { level, printPretty } = APP_CONFIG.logging;
const loggerOptions: LoggerOptions = {
  level,
};

if (printPretty) {
  loggerOptions.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

export const logger = createLogger(loggerOptions);
