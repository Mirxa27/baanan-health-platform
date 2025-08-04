export abstract class BaseError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  readonly timestamp: Date;
  readonly correlationId?: string;

  constructor(
    message: string,
    public readonly context?: Record<string, unknown>,
    correlationId?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
    this.correlationId = correlationId;
    
    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      context: this.context,
    };
  }
}
