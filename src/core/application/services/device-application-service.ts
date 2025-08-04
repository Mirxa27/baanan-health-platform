import { Device, DeviceFilters } from '../../domain/entities/device';
import { DeviceRepository } from '../../interfaces/repositories/device-repository';
import { 
  DeviceService,
  CreateDeviceRequest,
  UpdateDeviceRequest,
  DeviceSearchRequest,
  DeviceSearchResponse,
  StockUpdateRequest
} from '../../interfaces/services/device-service';
import { NotFoundError, ValidationError, BusinessRuleViolationError } from '../../../shared/errors/domain-errors';
import { logger } from '../../../shared/logging/logger';
import { config } from '../../../infrastructure/config/app-config';

export class DeviceApplicationService implements DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository
  ) {}

  async createDevice(request: CreateDeviceRequest): Promise<Device> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Device Creation Started', {
      deviceName: request.name,
      category: request.category,
      brand: request.brand,
    }, correlationId);

    try {
      // Validate business rules
      this.validateCreateRequest(request);

      // Create domain entity
      const device = Device.create({
        name: request.name,
        description: request.description,
        category: request.category as any,
        brand: request.brand,
        model: request.model,
        price: request.price,
        rentPrice: request.rentPrice,
        imageUrl: request.imageUrl,
        stock: {
          quantity: request.stock.quantity,
          reserved: request.stock.reserved || 0,
        },
        specifications: request.specifications,
        certifications: request.certifications,
        isActive: true,
      });

      // Save to repository
      const savedDevice = await this.deviceRepository.save(device);

      logger.businessEvent('Device Created Successfully', {
        deviceId: savedDevice.id,
        deviceName: savedDevice.name,
      }, correlationId);

      return savedDevice;
    } catch (error) {
      logger.error('Device Creation Failed', {
        request,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);
      throw error;
    }
  }

  async getDevice(id: string): Promise<Device> {
    if (!id) {
      throw new ValidationError('Device ID is required');
    }

    const device = await this.deviceRepository.findById(id);
    if (!device) {
      throw new NotFoundError('Device', id);
    }

    return device;
  }

  async updateDevice(id: string, request: UpdateDeviceRequest): Promise<Device> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Device Update Started', { deviceId: id }, correlationId);

    try {
      const device = await this.getDevice(id);

      // Apply updates
      if (request.name !== undefined) {
        // Device entity doesn't have direct setters, so we'd need to create a new one
        // For now, we'll handle this in the repository layer
      }

      if (request.price !== undefined) {
        device.updatePrice(request.price);
      }

      if (request.rentPrice !== undefined) {
        device.updateRentPrice(request.rentPrice);
      }

      const updatedDevice = await this.deviceRepository.save(device);

      logger.businessEvent('Device Updated Successfully', {
        deviceId: updatedDevice.id,
      }, correlationId);

      return updatedDevice;
    } catch (error) {
      logger.error('Device Update Failed', {
        deviceId: id,
        request,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);
      throw error;
    }
  }

  async deleteDevice(id: string): Promise<void> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Device Deletion Started', { deviceId: id }, correlationId);

    try {
      const device = await this.getDevice(id);

      // Business rule: Cannot delete device with reserved stock
      if (device.stock.reserved > 0) {
        throw new BusinessRuleViolationError(
          'CANNOT_DELETE_RESERVED_DEVICE',
          'Cannot delete device with reserved stock'
        );
      }

      await this.deviceRepository.delete(id);

      logger.businessEvent('Device Deleted Successfully', { deviceId: id }, correlationId);
    } catch (error) {
      logger.error('Device Deletion Failed', {
        deviceId: id,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);
      throw error;
    }
  }

  async searchDevices(request: DeviceSearchRequest): Promise<DeviceSearchResponse> {
    const page = request.pagination?.page || 1;
    const limit = request.pagination?.limit || 20;
    const offset = (page - 1) * limit;

    const result = await this.deviceRepository.find(
      request.filters,
      {
        limit,
        offset,
        sortBy: request.sorting?.field,
        sortOrder: request.sorting?.order,
      }
    );

    // Get metadata for filters
    const [categories, brands] = await Promise.all([
      this.deviceRepository.getCategories(),
      this.deviceRepository.getBrands(),
    ]);

    // Calculate price range from current results
    const prices = result.devices.map(d => d.price.amount);
    const priceRange = {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    };

    return {
      devices: result.devices,
      pagination: {
        current: page,
        total: Math.ceil(result.total / limit),
        hasNext: offset + limit < result.total,
        hasPrev: page > 1,
      },
      filters: {
        categories,
        brands,
        priceRange,
      },
    };
  }

  async checkAvailability(deviceId: string, quantity: number): Promise<{
    available: boolean;
    stockLevel: number;
    message: string;
  }> {
    const device = await this.getDevice(deviceId);
    const availableStock = device.availableStock();
    
    return {
      available: device.isAvailableForPurchase(quantity),
      stockLevel: availableStock,
      message: availableStock >= quantity 
        ? `${quantity} units available`
        : `Only ${availableStock} units available, ${quantity} requested`,
    };
  }

  async reserveStock(deviceId: string, quantity: number): Promise<void> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Stock Reservation Started', {
      deviceId,
      quantity,
    }, correlationId);

    try {
      const device = await this.getDevice(deviceId);
      device.reserveStock(quantity);
      
      await this.deviceRepository.save(device);

      logger.businessEvent('Stock Reserved Successfully', {
        deviceId,
        quantity,
        remainingStock: device.availableStock(),
      }, correlationId);
    } catch (error) {
      logger.error('Stock Reservation Failed', {
        deviceId,
        quantity,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);
      throw error;
    }
  }

  async releaseStock(deviceId: string, quantity: number): Promise<void> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Stock Release Started', {
      deviceId,
      quantity,
    }, correlationId);

    try {
      const device = await this.getDevice(deviceId);
      device.releaseStock(quantity);
      
      await this.deviceRepository.save(device);

      logger.businessEvent('Stock Released Successfully', {
        deviceId,
        quantity,
        availableStock: device.availableStock(),
      }, correlationId);
    } catch (error) {
      logger.error('Stock Release Failed', {
        deviceId,
        quantity,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);
      throw error;
    }
  }

  async updateStock(updates: StockUpdateRequest[]): Promise<void> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Bulk Stock Update Started', {
      updateCount: updates.length,
    }, correlationId);

    try {
      for (const update of updates) {
        const device = await this.getDevice(update.deviceId);
        
        switch (update.operation) {
          case 'set':
            device.adjustStock(update.quantity);
            break;
          case 'add':
            device.adjustStock(device.stock.quantity + update.quantity);
            break;
          case 'subtract':
            device.adjustStock(device.stock.quantity - update.quantity);
            break;
        }

        await this.deviceRepository.save(device);
      }

      logger.businessEvent('Bulk Stock Update Completed', {
        updateCount: updates.length,
      }, correlationId);
    } catch (error) {
      logger.error('Bulk Stock Update Failed', {
        updates,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);
      throw error;
    }
  }

  async getLowStockDevices(threshold: number = 10): Promise<Device[]> {
    return this.deviceRepository.findLowStock(threshold);
  }

  async activateDevice(id: string): Promise<Device> {
    const device = await this.getDevice(id);
    device.activate();
    return this.deviceRepository.save(device);
  }

  async deactivateDevice(id: string): Promise<Device> {
    const device = await this.getDevice(id);
    device.deactivate();
    return this.deviceRepository.save(device);
  }

  async getDeviceMetadata(): Promise<{
    categories: string[];
    brands: string[];
    priceRange: { min: number; max: number };
    totalDevices: number;
    activeDevices: number;
  }> {
    const [categories, brands, allDevices] = await Promise.all([
      this.deviceRepository.getCategories(),
      this.deviceRepository.getBrands(),
      this.deviceRepository.find(),
    ]);

    const prices = allDevices.devices.map(d => d.price.amount);
    const activeDevices = allDevices.devices.filter(d => d.isActive);

    return {
      categories,
      brands,
      priceRange: {
        min: prices.length > 0 ? Math.min(...prices) : 0,
        max: prices.length > 0 ? Math.max(...prices) : 0,
      },
      totalDevices: allDevices.total,
      activeDevices: activeDevices.length,
    };
  }

  async bulkImportDevices(devices: CreateDeviceRequest[]): Promise<{
    successful: Device[];
    failed: Array<{ device: CreateDeviceRequest; error: string }>;
  }> {
    const correlationId = this.generateCorrelationId();
    const successful: Device[] = [];
    const failed: Array<{ device: CreateDeviceRequest; error: string }> = [];

    logger.businessEvent('Bulk Device Import Started', {
      deviceCount: devices.length,
    }, correlationId);

    for (const deviceRequest of devices) {
      try {
        const device = await this.createDevice(deviceRequest);
        successful.push(device);
      } catch (error) {
        failed.push({
          device: deviceRequest,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    logger.businessEvent('Bulk Device Import Completed', {
      total: devices.length,
      successful: successful.length,
      failed: failed.length,
    }, correlationId);

    return { successful, failed };
  }

  async getDeviceAnalytics(startDate: Date, endDate: Date): Promise<{
    topSelling: Array<{ device: Device; soldQuantity: number; revenue: number }>;
    categoryPerformance: Array<{ category: string; soldQuantity: number; revenue: number }>;
    inventoryTurnover: number;
  }> {
    // This would typically involve the order repository as well
    // For now, returning empty data structure
    return {
      topSelling: [],
      categoryPerformance: [],
      inventoryTurnover: 0,
    };
  }

  private validateCreateRequest(request: CreateDeviceRequest): void {
    if (!request.name?.trim()) {
      throw new ValidationError('Device name is required');
    }

    if (!request.category?.trim()) {
      throw new ValidationError('Device category is required');
    }

    if (!request.brand?.trim()) {
      throw new ValidationError('Device brand is required');
    }

    if (!request.model?.trim()) {
      throw new ValidationError('Device model is required');
    }

    if (request.price.amount <= 0) {
      throw new ValidationError('Device price must be positive');
    }

    if (request.rentPrice.amount <= 0) {
      throw new ValidationError('Device rent price must be positive');
    }

    if (request.stock.quantity < 0) {
      throw new ValidationError('Stock quantity cannot be negative');
    }

    if (request.price.currency !== config.getDefaultCurrency()) {
      throw new ValidationError(`Price currency must be ${config.getDefaultCurrency()}`);
    }

    if (request.rentPrice.currency !== config.getDefaultCurrency()) {
      throw new ValidationError(`Rent price currency must be ${config.getDefaultCurrency()}`);
    }
  }

  private generateCorrelationId(): string {
    return `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
