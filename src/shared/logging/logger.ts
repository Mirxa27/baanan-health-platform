type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  correlationId?: string;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private minLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

  private levelPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  private shouldLog(level: LogLevel): boolean {
    return this.levelPriority[level] >= this.levelPriority[this.minLevel];
  }

  private formatLog(entry: LogEntry): string {
    if (this.isDevelopment) {
      // Pretty format for development
      const timestamp = new Date(entry.timestamp).toLocaleTimeString();
      const level = entry.level.toUpperCase().padEnd(5);
      const context = entry.context ? `\n  Context: ${JSON.stringify(entry.context, null, 2)}` : '';
      const correlation = entry.correlationId ? ` [${entry.correlationId}]` : '';
      
      return `${timestamp} ${level} ${entry.message}${correlation}${context}`;
    } else {
      // JSON format for production
      return JSON.stringify(entry);
    }
  }

  private log(level: LogLevel, message: string, context?: LogContext, correlationId?: string): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      correlationId,
    };

    const formatted = this.formatLog(entry);

    switch (level) {
      case 'debug':
      case 'info':
        console.log(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'error':
        console.error(formatted);
        break;
    }
  }

  debug(message: string, context?: LogContext, correlationId?: string): void {
    this.log('debug', message, context, correlationId);
  }

  info(message: string, context?: LogContext, correlationId?: string): void {
    this.log('info', message, context, correlationId);
  }

  warn(message: string, context?: LogContext, correlationId?: string): void {
    this.log('warn', message, context, correlationId);
  }

  error(message: string, context?: LogContext, correlationId?: string): void {
    this.log('error', message, context, correlationId);
  }

  // Convenience methods for common patterns
  apiRequest(method: string, path: string, correlationId?: string, userId?: string): void {
    this.info('API Request', {
      method,
      path,
      userId,
    }, correlationId);
  }

  apiResponse(method: string, path: string, statusCode: number, duration: number, correlationId?: string): void {
    this.info('API Response', {
      method,
      path,
      statusCode,
      duration,
    }, correlationId);
  }

  businessEvent(event: string, context?: LogContext, correlationId?: string): void {
    this.info(`Business Event: ${event}`, context, correlationId);
  }

  securityEvent(event: string, context?: LogContext, correlationId?: string): void {
    this.warn(`Security Event: ${event}`, context, correlationId);
  }
}

export const logger = new Logger();
