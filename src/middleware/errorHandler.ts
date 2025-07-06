// src/middleware/errorHandler.ts
import { ErrorRequestHandler } from 'express';
import logger from '../lib/logger';

// A custom type guard to check for our specific error property.
// We use 'unknown' which is the type-safe counterpart of 'any'.
const isServiceError = (
  err: unknown
): err is { message: string; isServiceError: true } => {
  // To safely access properties on an 'unknown' type, we must first
  // validate that it's an object we can work with.
  return (
    typeof err === 'object' &&
    err !== null &&
    (err as { isServiceError?: boolean }).isServiceError === true
  );
};

// By explicitly typing our function with ErrorRequestHandler, we ensure
// it has the correct (err, req, res, next) signature that Express expects.
export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // The 'next' parameter is required for Express to identify this as an
  // error-handling middleware, even if it's not used.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  // Use our reliable type guard to check for "safe" service errors.
  if (isServiceError(err)) {
    logger.warn({ err }, 'A service error occurred (e.g., validation failure)');
    // For validation errors, send a 400 Bad Request.
    // We call the method but do not return its value.
    res.status(400).json({
      // After the type guard, TypeScript knows 'err' has a 'message' property.
      message: err.message,
    });
  } else {
    // For all other unexpected errors, log it as a critical failure
    // and return a generic 500 error to hide implementation details.
    logger.error({ err }, 'An unexpected error occurred');
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
