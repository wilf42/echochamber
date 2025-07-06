// src/errors/ServiceError.ts

/**
 * Custom error class for service-level failures.
 * This allows higher-level modules (like API controllers) to catch
 * specific types of errors from the service layer without needing to
 * know about the underlying implementation (e.g., database errors).
 */
export class ServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceError';
  }
}
