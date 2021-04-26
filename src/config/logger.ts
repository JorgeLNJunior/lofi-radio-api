import expressWinston from 'express-winston';
import winston from 'winston';

export const httpLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/http/logs.json' }),
  ],
  format: winston.format.combine(winston.format.json()),
  ignoredRoutes: [
    '/docs',
    '/docs/',
    '/docs/swagger-ui.css',
    '/docs/swagger-ui-standalone-preset.js',
    '/docs/swagger-ui-init.js',
    '/docs/swagger-ui-bundle.js',
    '/docs/favicon-16x16.png',
    '/favicon.ico',
  ],
});

export const errorLogger = winston.createLogger({
  transports: new winston.transports.File({ filename: 'logs/error/logs.json' }),
  format: winston.format.json(),
});

export const warnLogger = winston.createLogger({
  transports: new winston.transports.File({ filename: 'logs/warn/logs.json' }),
  format: winston.format.json(),
});
