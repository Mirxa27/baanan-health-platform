import { PrismaClient } from '@prisma/client';
import { DeviceApplicationService } from '../../core/application/services/device-application-service';
import { OrderApplicationService } from '../../core/application/services/order-application-service';
import { PrismaDeviceRepository } from '../database/repositories/prisma-device-repository';
import { PrismaOrderRepository } from '../database/repositories/prisma-order-repository';
import { DeviceService } from '../../core/interfaces/services/device-service';
import { DeviceRepository } from '../../core/interfaces/repositories/device-repository';
import { OrderRepository } from '../../core/interfaces/repositories/order-repository';
import { config } from '../config/app-config';
import { logger } from '../../shared/logging/logger';

class DIContainer {
  private static instance: DIContainer;
  private services: Map<string, any> = new Map();
  private prismaClient: PrismaClient | null = null;

  private constructor() {}

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  public getPrismaClient(): PrismaClient {
    if (!this.prismaClient) {
      this.prismaClient = new PrismaClient({
        log: config.isDevelopment() 
          ? ['query', 'info', 'warn', 'error']
          : ['warn', 'error'],
        datasources: {
          db: {
            url: config.get('DATABASE_URL'),
          },
        },
      });

      // Connect and log
      this.prismaClient.$connect()
        .then(() => {
          logger.info('Database connected successfully');
        })
        .catch((error) => {
          logger.error('Database connection failed', { error: error.message });
          throw error;
        });
    }
    return this.prismaClient;
  }

  public getDeviceRepository(): DeviceRepository {
    const key = 'DeviceRepository';
    if (!this.services.has(key)) {
      const prisma = this.getPrismaClient();
      this.services.set(key, new PrismaDeviceRepository(prisma));
    }
    return this.services.get(key);
  }

  public getOrderRepository(): OrderRepository {
    const key = 'OrderRepository';
    if (!this.services.has(key)) {
      const prisma = this.getPrismaClient();
      this.services.set(key, new PrismaOrderRepository(prisma));
    }
    return this.services.get(key);
  }

  public getDeviceService(): DeviceService {
    const key = 'DeviceService';
    if (!this.services.has(key)) {
      const deviceRepository = this.getDeviceRepository();
      this.services.set(key, new DeviceApplicationService(deviceRepository));
    }
    return this.services.get(key);
  }

  public getOrderService(): OrderApplicationService {
    const key = 'OrderService';
    if (!this.services.has(key)) {
      const orderRepository = this.getOrderRepository();
      const deviceRepository = this.getDeviceRepository();
      this.services.set(key, new OrderApplicationService(orderRepository, deviceRepository));
    }
    return this.services.get(key);
  }

  // Utility method to register custom services
  public register<T>(key: string, service: T): void {
    this.services.set(key, service);
    logger.debug(`Service registered: ${key}`);
  }

  // Utility method to get any registered service
  public get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service not found: ${key}`);
    }
    return service;
  }

  // Clean up resources
  public async cleanup(): Promise<void> {
    if (this.prismaClient) {
      await this.prismaClient.$disconnect();
      logger.info('Database disconnected');
    }
    this.services.clear();
  }
}

// Singleton instance
export const container = DIContainer.getInstance();

// Convenience getters
export const getDeviceService = (): DeviceService => container.getDeviceService();
export const getDeviceRepository = (): DeviceRepository => container.getDeviceRepository();
export const getOrderService = (): OrderApplicationService => container.getOrderService();
export const getOrderRepository = (): OrderRepository => container.getOrderRepository();
export const getPrismaClient = (): PrismaClient => container.getPrismaClient();

// Placeholder user service getter (would need to implement UserService)
export const getUserService = (): any => {
  throw new Error('UserService not yet implemented');
};
