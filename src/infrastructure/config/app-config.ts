import { z } from 'zod';

const configSchema = z.object({
  // App Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default(3000),
  
  // URLs and Origins
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  
  // Database
  DATABASE_URL: z.string().url(),
  
  // External Services
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  
  // Email (optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  
  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  
  // Security
  BCRYPT_SALT_ROUNDS: z.string().transform(Number).default(12),
  JWT_EXPIRES_IN: z.string().default('30d'),
  
  // Business Settings
  DEFAULT_CURRENCY: z.string().default('SAR'),
  MARKETPLACE_COMMISSION_RATE: z.string().transform(Number).default(0.05), // 5%
  RENTAL_COMMISSION_RATE: z.string().transform(Number).default(0.08), // 8%
  
  // Feature Flags
  ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default(true),
  ENABLE_NOTIFICATIONS: z.string().transform(val => val === 'true').default(true),
  ENABLE_MAINTENANCE_MODE: z.string().transform(val => val === 'true').default(false),
});

type AppConfig = z.infer<typeof configSchema>;

class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig(): AppConfig {
    try {
      const result = configSchema.parse(process.env);
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const missingVars = error.errors.map(err => err.path.join('.')).join(', ');
        throw new Error(`Invalid configuration. Missing or invalid variables: ${missingVars}`);
      }
      throw error;
    }
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  public getAll(): AppConfig {
    return { ...this.config };
  }

  public isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  public isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  public isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }

  // Business-specific getters
  public getMarketplaceCommissionRate(): number {
    return this.config.MARKETPLACE_COMMISSION_RATE;
  }

  public getRentalCommissionRate(): number {
    return this.config.RENTAL_COMMISSION_RATE;
  }

  public getDefaultCurrency(): string {
    return this.config.DEFAULT_CURRENCY;
  }
}

export const config = ConfigManager.getInstance();
export type { AppConfig };
