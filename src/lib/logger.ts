// src/lib/logger.ts
import pino from 'pino';

// Configure the pino logger.
// In development, we use pino-pretty for beautiful, human-readable logs.
// In production, it will default to outputting structured JSON, which is
// ideal for log aggregation services.
const logger = pino({
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            // Optional: hide pid and hostname for cleaner logs in dev
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  // Set the default log level. Can be overridden by an environment variable.
  level: process.env.LOG_LEVEL || 'info',
});

export default logger;
