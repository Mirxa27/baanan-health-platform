import { Device, DeviceFilters } from '../../domain/entities/device';

export interface CreateDeviceRequest {
  name: string;
  description: string;
  category: string;
  brand: string;
  model: string;
  price: {
    amount: number;
    currency: string;
  };
  rentPrice: {
    amount: number;
    currency: string;
  };
  imageUrl?: string;
  stock: {
    quantity: number;
    reserved?: number;
  };
  specifications?: Record<string, unknown>;
  certifications?: string[];
}

export interface UpdateDeviceRequest {
  name?: string;
  description?: string;
  category?: string;
  brand?: string;
  model?: string;
  price?: {
    amount: number;
    currency: string;
  };
  rentPrice?: {
    amount: number;
    currency: string;
  };
  imageUrl?: string;
  specifications?: Record<string, unknown>;
  certifications?: string[];
}

export interface DeviceSearchRequest {
  filters?: DeviceFilters;
  searchTerm?: string;
  pagination?: {
    page: number;
    limit: number;
  };
  sorting?: {
    field: 'name' | 'price' | 'rentPrice' | 'createdAt';
    order: 'asc' | 'desc';
  };
}

export interface DeviceSearchResponse {
  devices: Device[];
  pagination: {
    current: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    categories: string[];
    brands: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
}

export interface StockUpdateRequest {
  deviceId: string;
  quantity: number;
  operation: 'set' | 'add' | 'subtract';
}

export interface DeviceService {
  /**
   * Create a new device
   */
  createDevice(request: CreateDeviceRequest): Promise<Device>;

  /**
   * Get device by ID
   */
  getDevice(id: string): Promise<Device>;

  /**
   * Update device information
   */
  updateDevice(id: string, request: UpdateDeviceRequest): Promise<Device>;

  /**
   * Delete a device
   */
  deleteDevice(id: string): Promise<void>;

  /**
   * Search devices with filters and pagination
   */
  searchDevices(request: DeviceSearchRequest): Promise<DeviceSearchResponse>;

  /**
   * Get device availability for purchase
   */
  checkAvailability(deviceId: string, quantity: number): Promise<{
    available: boolean;
    stockLevel: number;
    message: string;
  }>;

  /**
   * Reserve stock for a device (for pending orders)
   */
  reserveStock(deviceId: string, quantity: number): Promise<void>;

  /**
   * Release reserved stock
   */
  releaseStock(deviceId: string, quantity: number): Promise<void>;

  /**
   * Update device stock
   */
  updateStock(updates: StockUpdateRequest[]): Promise<void>;

  /**
   * Get devices with low stock
   */
  getLowStockDevices(threshold?: number): Promise<Device[]>;

  /**
   * Activate a device
   */
  activateDevice(id: string): Promise<Device>;

  /**
   * Deactivate a device
   */
  deactivateDevice(id: string): Promise<Device>;

  /**
   * Get device categories and metadata
   */
  getDeviceMetadata(): Promise<{
    categories: string[];
    brands: string[];
    priceRange: {
      min: number;
      max: number;
    };
    totalDevices: number;
    activeDevices: number;
  }>;

  /**
   * Bulk import devices
   */
  bulkImportDevices(devices: CreateDeviceRequest[]): Promise<{
    successful: Device[];
    failed: Array<{
      device: CreateDeviceRequest;
      error: string;
    }>;
  }>;

  /**
   * Get device analytics
   */
  getDeviceAnalytics(
    startDate: Date,
    endDate: Date
  ): Promise<{
    topSelling: Array<{
      device: Device;
      soldQuantity: number;
      revenue: number;
    }>;
    categoryPerformance: Array<{
      category: string;
      soldQuantity: number;
      revenue: number;
    }>;
    inventoryTurnover: number;
  }>;
}
