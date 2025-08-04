import { PrismaClient } from '@prisma/client';
import { Device, DeviceFilters } from '../../../core/domain/entities/device';
import { DeviceRepository } from '../../../core/interfaces/repositories/device-repository';
import { logger } from '../../../shared/logging/logger';

export class PrismaDeviceRepository implements DeviceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Device | null> {
    try {
      const device = await this.prisma.device.findUnique({
        where: { id },
      });

      return device ? this.toDomain(device) : null;
    } catch (error) {
      logger.error('Failed to find device by ID', {
        id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async find(
    filters?: DeviceFilters,
    options?: {
      limit?: number;
      offset?: number;
      sortBy?: 'name' | 'price' | 'rentPrice' | 'createdAt';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<{ devices: Device[]; total: number }> {
    try {
      const where = this.buildWhereClause(filters);
      const orderBy = this.buildOrderBy(options?.sortBy, options?.sortOrder);

      const [devices, total] = await Promise.all([
        this.prisma.device.findMany({
          where,
          orderBy,
          take: options?.limit,
          skip: options?.offset,
        }),
        this.prisma.device.count({ where }),
      ]);

      return {
        devices: devices.map(device => this.toDomain(device)),
        total,
      };
    } catch (error) {
      logger.error('Failed to find devices', {
        filters,
        options,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async findByCategory(category: string): Promise<Device[]> {
    try {
      const devices = await this.prisma.device.findMany({
        where: {
          category,
          isAvailable: true,
        },
        orderBy: { name: 'asc' },
      });

      return devices.map(device => this.toDomain(device));
    } catch (error) {
      logger.error('Failed to find devices by category', {
        category,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async findByBrand(brand: string): Promise<Device[]> {
    try {
      const devices = await this.prisma.device.findMany({
        where: {
          brand,
          isAvailable: true,
        },
        orderBy: { name: 'asc' },
      });

      return devices.map(device => this.toDomain(device));
    } catch (error) {
      logger.error('Failed to find devices by brand', {
        brand,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async search(
    query: string,
    options?: { limit?: number; offset?: number }
  ): Promise<{ devices: Device[]; total: number }> {
    try {
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
      
      const where = {
        AND: searchTerms.map(term => ({
          OR: [
            { name: { contains: term, mode: 'insensitive' as const } },
            { description: { contains: term, mode: 'insensitive' as const } },
            { brand: { contains: term, mode: 'insensitive' as const } },
            { model: { contains: term, mode: 'insensitive' as const } },
            { category: { contains: term, mode: 'insensitive' as const } },
          ],
        })),
        isAvailable: true,
      };

      const [devices, total] = await Promise.all([
        this.prisma.device.findMany({
          where,
          take: options?.limit,
          skip: options?.offset,
          orderBy: { name: 'asc' },
        }),
        this.prisma.device.count({ where }),
      ]);

      return {
        devices: devices.map(device => this.toDomain(device)),
        total,
      };
    } catch (error) {
      logger.error('Failed to search devices', {
        query,
        options,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async save(device: Device): Promise<Device> {
    try {
      const deviceData = this.fromDomain(device);
      
      let savedDevice;
      if (device.id) {
        // Update existing device
        savedDevice = await this.prisma.device.update({
          where: { id: device.id },
          data: deviceData,
        });
      } else {
        // Create new device
        savedDevice = await this.prisma.device.create({
          data: deviceData,
        });
      }

      return this.toDomain(savedDevice);
    } catch (error) {
      logger.error('Failed to save device', {
        deviceId: device.id,
        deviceName: device.name,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.device.delete({
        where: { id },
      });

      logger.info('Device deleted successfully', { deviceId: id });
    } catch (error) {
      logger.error('Failed to delete device', {
        id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.prisma.device.count({
        where: { id },
      });
      return count > 0;
    } catch (error) {
      logger.error('Failed to check device existence', {
        id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const result = await this.prisma.device.findMany({
        select: { category: true },
        distinct: ['category'],
        where: { isAvailable: true },
        orderBy: { category: 'asc' },
      });

      return result.map(item => item.category);
    } catch (error) {
      logger.error('Failed to get device categories', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async getBrands(): Promise<string[]> {
    try {
      const result = await this.prisma.device.findMany({
        select: { brand: true },
        distinct: ['brand'],
        where: { isAvailable: true },
        orderBy: { brand: 'asc' },
      });

      return result.map(item => item.brand);
    } catch (error) {
      logger.error('Failed to get device brands', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async findLowStock(threshold: number = 10): Promise<Device[]> {
    try {
      const devices = await this.prisma.device.findMany({
        where: {
          stock: { lte: threshold },
          isAvailable: true,
        },
        orderBy: { stock: 'asc' },
      });

      return devices.map(device => this.toDomain(device));
    } catch (error) {
      logger.error('Failed to find low stock devices', {
        threshold,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async updateStock(updates: Array<{ deviceId: string; quantity: number }>): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const update of updates) {
          await tx.device.update({
            where: { id: update.deviceId },
            data: { stock: update.quantity },
          });
        }
      });

      logger.info('Stock updated successfully', { updateCount: updates.length });
    } catch (error) {
      logger.error('Failed to update stock', {
        updates,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async reserveStock(reservations: Array<{ deviceId: string; quantity: number }>): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const reservation of reservations) {
          await tx.device.update({
            where: { id: reservation.deviceId },
            data: {
              stock: { decrement: reservation.quantity },
            },
          });
        }
      });

      logger.info('Stock reserved successfully', { reservationCount: reservations.length });
    } catch (error) {
      logger.error('Failed to reserve stock', {
        reservations,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async releaseStock(releases: Array<{ deviceId: string; quantity: number }>): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const release of releases) {
          await tx.device.update({
            where: { id: release.deviceId },
            data: {
              stock: { increment: release.quantity },
            },
          });
        }
      });

      logger.info('Stock released successfully', { releaseCount: releases.length });
    } catch (error) {
      logger.error('Failed to release stock', {
        releases,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  private toDomain(device: any): Device {
    return Device.fromPersistence({
      id: device.id,
      name: device.name,
      description: device.description || '',
      category: device.category,
      brand: device.brand,
      model: device.model,
      price: {
        amount: parseFloat(device.price.toString()),
        currency: 'SAR', // Default currency from config
      },
      rentPrice: {
        amount: parseFloat(device.rentPrice.toString()),
        currency: 'SAR',
      },
      imageUrl: device.imageUrl,
      stock: {
        quantity: device.stock,
        reserved: 0, // Would need to add this field to Prisma schema
      },
      isActive: device.isAvailable,
      specifications: undefined, // Would need to add this field to Prisma schema
      certifications: undefined, // Would need to add this field to Prisma schema
      createdAt: device.createdAt,
      updatedAt: device.updatedAt,
    });
  }

  private fromDomain(device: Device): any {
    const props = device.toPersistence();
    return {
      name: props.name,
      description: props.description,
      category: props.category,
      brand: props.brand,
      model: props.model,
      price: props.price.amount,
      rentPrice: props.rentPrice.amount,
      imageUrl: props.imageUrl,
      stock: props.stock.quantity,
      isAvailable: props.isActive,
      updatedAt: props.updatedAt,
    };
  }

  private buildWhereClause(filters?: DeviceFilters): any {
    if (!filters) return { isAvailable: true };

    const where: any = { isAvailable: true };

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.brand) {
      where.brand = filters.brand;
    }

    if (filters.priceRange) {
      where.price = {
        gte: filters.priceRange.min,
        lte: filters.priceRange.max,
      };
    }

    if (filters.availableOnly) {
      where.stock = { gt: 0 };
    }

    if (filters.searchTerm) {
      const searchTerms = filters.searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
      where.AND = searchTerms.map(term => ({
        OR: [
          { name: { contains: term, mode: 'insensitive' as const } },
          { description: { contains: term, mode: 'insensitive' as const } },
          { brand: { contains: term, mode: 'insensitive' as const } },
          { model: { contains: term, mode: 'insensitive' as const } },
        ],
      }));
    }

    return where;
  }

  private buildOrderBy(sortBy?: string, sortOrder?: string): any {
    const order = sortOrder === 'desc' ? 'desc' : 'asc';

    switch (sortBy) {
      case 'name':
        return { name: order };
      case 'price':
        return { price: order };
      case 'rentPrice':
        return { rentPrice: order };
      case 'createdAt':
        return { createdAt: order };
      default:
        return { name: 'asc' };
    }
  }
}
