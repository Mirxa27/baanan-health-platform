import { BaseError } from './base-error';

export class ValidationError extends BaseError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;

  constructor(message: string, public readonly fields?: Record<string, string[]>, correlationId?: string) {
    super(message, { fields }, correlationId);
  }
}

export class NotFoundError extends BaseError {
  readonly code = 'NOT_FOUND';
  readonly statusCode = 404;

  constructor(resource: string, identifier: string, correlationId?: string) {
    super(`${resource} with id '${identifier}' not found`, { resource, identifier }, correlationId);
  }
}

export class UnauthorizedError extends BaseError {
  readonly code = 'UNAUTHORIZED';
  readonly statusCode = 401;

  constructor(message: string = 'Authentication required', correlationId?: string) {
    super(message, undefined, correlationId);
  }
}

export class ForbiddenError extends BaseError {
  readonly code = 'FORBIDDEN';
  readonly statusCode = 403;

  constructor(message: string = 'Access denied', correlationId?: string) {
    super(message, undefined, correlationId);
  }
}

export class ConflictError extends BaseError {
  readonly code = 'CONFLICT';
  readonly statusCode = 409;

  constructor(message: string, correlationId?: string) {
    super(message, undefined, correlationId);
  }
}

export class BusinessRuleViolationError extends BaseError {
  readonly code = 'BUSINESS_RULE_VIOLATION';
  readonly statusCode = 422;

  constructor(rule: string, message: string, correlationId?: string) {
    super(message, { rule }, correlationId);
  }
}

export class ExternalServiceError extends BaseError {
  readonly code = 'EXTERNAL_SERVICE_ERROR';
  readonly statusCode = 502;

  constructor(service: string, message: string, correlationId?: string) {
    super(`External service error: ${service} - ${message}`, { service }, correlationId);
  }
}

export class InternalServerError extends BaseError {
  readonly code = 'INTERNAL_SERVER_ERROR';
  readonly statusCode = 500;

  constructor(message: string = 'Internal server error occurred', correlationId?: string) {
    super(message, undefined, correlationId);
  }
}
