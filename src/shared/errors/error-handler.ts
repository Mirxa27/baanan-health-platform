import { NextResponse } from 'next/server';
import { BaseError } from './base-error';
import { InternalServerError } from './domain-errors';
import { logger } from '../logging/logger';

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    timestamp: string;
    correlationId?: string;
    details?: Record<string, unknown>;
  };
}

export function handleApiError(error: unknown, correlationId?: string): NextResponse<ErrorResponse> {
  let apiError: BaseError;

  if (error instanceof BaseError) {
    apiError = error;
  } else if (error instanceof Error) {
    apiError = new InternalServerError(error.message, correlationId);
  } else {
    apiError = new InternalServerError('An unexpected error occurred', correlationId);
  }

  // Log the error with appropriate level
  if (apiError.statusCode >= 500) {
    logger.error('API Error', {
      error: apiError.toJSON(),
      stack: apiError.stack,
    });
  } else if (apiError.statusCode >= 400) {
    logger.warn('Client Error', {
      error: apiError.toJSON(),
    });
  }

  const response: ErrorResponse = {
    error: {
      code: apiError.code,
      message: apiError.message,
      timestamp: apiError.timestamp.toISOString(),
      correlationId: apiError.correlationId,
      details: apiError.context,
    },
  };

  return NextResponse.json(response, { status: apiError.statusCode });
}
