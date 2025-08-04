import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { handleApiError } from '../../shared/errors/error-handler';
import { logger } from '../../shared/logging/logger';
import { UnauthorizedError, ForbiddenError } from '../../shared/errors/domain-errors';

export interface ApiContext {
  correlationId: string;
  userId?: string;
  userRole?: string;
  startTime: number;
}

export function generateCorrelationId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function withErrorHandler<T>(
  handler: (request: NextRequest, context: ApiContext) => Promise<T>
) {
  return async (request: NextRequest) => {
    const correlationId = generateCorrelationId();
    const startTime = Date.now();
    
    // Log incoming request
    logger.apiRequest(
      request.method,
      request.nextUrl.pathname,
      correlationId
    );

    const context: ApiContext = {
      correlationId,
      startTime,
    };

    try {
      const result = await handler(request, context);
      
      // Log successful response
      const duration = Date.now() - startTime;
      logger.apiResponse(
        request.method,
        request.nextUrl.pathname,
        200, // Assume success
        duration,
        correlationId
      );

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Log error response
      logger.apiResponse(
        request.method,
        request.nextUrl.pathname,
        error instanceof Error ? 500 : 500,
        duration,
        correlationId
      );

      return handleApiError(error, correlationId);
    }
  };
}

export function withAuth<T>(
  handler: (request: NextRequest, context: ApiContext & { userId: string; userRole: string }) => Promise<T>,
  options: {
    requireRole?: 'ADMIN' | 'CUSTOMER';
  } = {}
) {
  return withErrorHandler(async (request: NextRequest, context: ApiContext) => {
    // Extract session from request headers or cookies
    // Note: This is a simplified version. In a real implementation,
    // you'd need to verify the JWT token or session
    const authHeader = request.headers.get('authorization');
    const sessionCookie = request.cookies.get('next-auth.session-token');

    if (!authHeader && !sessionCookie) {
      throw new UnauthorizedError('Authentication required');
    }

    // Mock session extraction - replace with actual session verification
    let userId: string;
    let userRole: string;

    try {
      // This would be replaced with actual JWT verification or session lookup
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        // Verify token and extract user info
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = 'user-123'; // decoded.userId
        userRole = 'CUSTOMER'; // decoded.role
      } else {
        // Get session from cookie
        userId = 'user-123'; // from session
        userRole = 'CUSTOMER'; // from session
      }

      // Check role permissions
      if (options.requireRole && userRole !== options.requireRole) {
        if (options.requireRole === 'ADMIN' && userRole === 'CUSTOMER') {
          throw new ForbiddenError('Admin access required');
        }
      }

      // Log authenticated request
      logger.info('Authenticated request', {
        userId,
        userRole,
        endpoint: request.nextUrl.pathname,
      }, context.correlationId);

      const authenticatedContext = {
        ...context,
        userId,
        userRole,
      };

      return handler(request, authenticatedContext);
    } catch (error) {
      logger.securityEvent('Authentication failed', {
        endpoint: request.nextUrl.pathname,
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        error: error instanceof Error ? error.message : 'Unknown error',
      }, context.correlationId);

      throw error;
    }
  });
}

export function withValidation<T>(
  schema: any, // Zod schema
  handler: (request: NextRequest, context: ApiContext, data: T) => Promise<any>
) {
  return withErrorHandler(async (request: NextRequest, context: ApiContext) => {
    try {
      const body = await request.json();
      const validatedData = schema.parse(body);
      
      logger.debug('Request data validated', {
        endpoint: request.nextUrl.pathname,
      }, context.correlationId);

      return handler(request, context, validatedData);
    } catch (error) {
      logger.warn('Request validation failed', {
        endpoint: request.nextUrl.pathname,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, context.correlationId);

      throw error;
    }
  });
}

export function withRateLimit(
  options: {
    windowMs: number;
    maxRequests: number;
    keyGenerator?: (request: NextRequest) => string;
  }
) {
  const requestCounts = new Map<string, { count: number; resetTime: number }>();

  return function<T>(
    handler: (request: NextRequest, context: ApiContext) => Promise<T>
  ) {
    return withErrorHandler(async (request: NextRequest, context: ApiContext) => {
      const key = options.keyGenerator 
        ? options.keyGenerator(request)
        : request.headers.get('x-forwarded-for') || 'unknown';

      const now = Date.now();
      const current = requestCounts.get(key);

      if (!current || now > current.resetTime) {
        // First request or window expired
        requestCounts.set(key, {
          count: 1,
          resetTime: now + options.windowMs,
        });
      } else if (current.count >= options.maxRequests) {
        // Rate limit exceeded
        logger.securityEvent('Rate limit exceeded', {
          key,
          count: current.count,
          limit: options.maxRequests,
          endpoint: request.nextUrl.pathname,
        }, context.correlationId);

        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      } else {
        // Increment count
        current.count++;
        requestCounts.set(key, current);
      }

      return handler(request, context);
    });
  };
}

// Utility function to create standardized API responses
export function createApiResponse<T>(
  data: T,
  options: {
    status?: number;
    message?: string;
    correlationId?: string;
  } = {}
): NextResponse {
  const response = {
    success: true,
    data,
    message: options.message,
    correlationId: options.correlationId,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: options.status || 200 });
}
