import { Device, DeviceFilters } from '../../domain/entities/device';

export interface DeviceRepository {
  /**
   * Find a device by its unique identifier
   */
  findById(id: string): Promise<Device | null>;

  /**
   * Find devices with optional filtering and pagination
   */
  find(
    filters?: DeviceFilters,
    options?: {
      limit?: number;
      offset?: number;
      sortBy?: 'name' | 'price' | 'rentPrice' | 'createdAt';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<{
    devices: Device[];
    total: number;
  }>;

  /**
   * Find devices by category
   */
  findByCategory(category: string): Promise<Device[]>;

  /**
   * Find devices by brand
   */
  findByBrand(brand: string): Promise<Device[]>;

  /**
   * Search devices by text query
   */
  search(
    query: string,
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<{
    devices: Device[];
    total: number;
  }>;

  /**
   * Save a new device or update an existing one
   */
  save(device: Device): Promise<Device>;

  /**
   * Delete a device by ID
   */
  delete(id: string): Promise<void>;

  /**
   * Check if a device exists
   */
  exists(id: string): Promise<boolean>;

  /**
   * Get all unique categories
   */
  getCategories(): Promise<string[]>;

  /**
   * Get all unique brands
   */
  getBrands(): Promise<string[]>;

  /**
   * Get devices with low stock (below threshold)
   */
  findLowStock(threshold?: number): Promise<Device[]>;

  /**
   * Update stock for multiple devices (atomic operation)
   */
  updateStock(updates: Array<{ deviceId: string; quantity: number }>): Promise<void>;

  /**
   * Reserve stock for devices (atomic operation)
   */
  reserveStock(reservations: Array<{ deviceId: string; quantity: number }>): Promise<void>;

  /**
   * Release reserved stock for devices (atomic operation)
   */
  releaseStock(releases: Array<{ deviceId: string; quantity: number }>): Promise<void>;
}
