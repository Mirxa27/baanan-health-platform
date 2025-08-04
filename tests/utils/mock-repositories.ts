import { Device, DeviceFilters } from '../../src/core/domain/entities/device';
import { DeviceRepository } from '../../src/core/interfaces/repositories/device-repository';

export class MockDeviceRepository implements DeviceRepository {
  private devices: Map<string, Device> = new Map();
  private nextId = 1;

  async findById(id: string): Promise<Device | null> {
    return this.devices.get(id) || null;
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
    let devices = Array.from(this.devices.values());

    // Apply filters
    if (filters) {
      devices = devices.filter(device => filters.matches(device));
    }

    // Apply sorting
    if (options?.sortBy) {
      devices.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (options.sortBy) {
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'price':
            aValue = a.price.amount;
            bValue = b.price.amount;
            break;
          case 'rentPrice':
            aValue = a.rentPrice.amount;
            bValue = b.rentPrice.amount;
            break;
          case 'createdAt':
            aValue = a.createdAt.getTime();
            bValue = b.createdAt.getTime();
            break;
          default:
            aValue = a.name;
            bValue = b.name;
        }

        if (options.sortOrder === 'desc') {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        }
      });
    }

    const total = devices.length;

    // Apply pagination
    if (options?.offset !== undefined || options?.limit !== undefined) {
      const offset = options.offset || 0;
      const limit = options.limit || devices.length;
      devices = devices.slice(offset, offset + limit);
    }

    return { devices, total };
  }

  async findByCategory(category: string): Promise<Device[]> {
    return Array.from(this.devices.values()).filter(
      device => device.category === category && device.isActive
    );
  }

  async findByBrand(brand: string): Promise<Device[]> {
    return Array.from(this.devices.values()).filter(
      device => device.brand === brand && device.isActive
    );
  }

  async search(
    query: string,
    options?: { limit?: number; offset?: number }
  ): Promise<{ devices: Device[]; total: number }> {
    const searchTerms = query.toLowerCase().split(' ');
    let devices = Array.from(this.devices.values()).filter(device => {
      const searchableText = [
        device.name,
        device.description,
        device.brand,
        device.model,
      ].join(' ').toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });

    const total = devices.length;

    if (options?.offset !== undefined || options?.limit !== undefined) {
      const offset = options.offset || 0;
      const limit = options.limit || devices.length;
      devices = devices.slice(offset, offset + limit);
    }

    return { devices, total };
  }

  async save(device: Device): Promise<Device> {
    const props = device.toPersistence();
    
    if (!props.id) {
      // Create new device
      const newId = `device-${this.nextId++}`;
      const newDevice = Device.fromPersistence({
        ...props,
        id: newId,
      });
      this.devices.set(newId, newDevice);
      return newDevice;
    } else {
      // Update existing device
      const updatedDevice = Device.fromPersistence(props);
      this.devices.set(props.id, updatedDevice);
      return updatedDevice;
    }
  }

  async delete(id: string): Promise<void> {
    this.devices.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.devices.has(id);
  }

  async getCategories(): Promise<string[]> {
    const categories = new Set<string>();
    this.devices.forEach(device => {
      if (device.isActive) {
        categories.add(device.category);
      }
    });
    return Array.from(categories).sort();
  }

  async getBrands(): Promise<string[]> {
    const brands = new Set<string>();
    this.devices.forEach(device => {
      if (device.isActive) {
        brands.add(device.brand);
      }
    });
    return Array.from(brands).sort();
  }

  async findLowStock(threshold: number = 10): Promise<Device[]> {
    return Array.from(this.devices.values()).filter(
      device => device.stock.quantity <= threshold && device.isActive
    );
  }

  async updateStock(updates: Array<{ deviceId: string; quantity: number }>): Promise<void> {
    for (const update of updates) {
      const device = this.devices.get(update.deviceId);
      if (device) {
        device.adjustStock(update.quantity);
        this.devices.set(update.deviceId, device);
      }
    }
  }

  async reserveStock(reservations: Array<{ deviceId: string; quantity: number }>): Promise<void> {
    for (const reservation of reservations) {
      const device = this.devices.get(reservation.deviceId);
      if (device) {
        device.reserveStock(reservation.quantity);
        this.devices.set(reservation.deviceId, device);
      }
    }
  }

  async releaseStock(releases: Array<{ deviceId: string; quantity: number }>): Promise<void> {
    for (const release of releases) {
      const device = this.devices.get(release.deviceId);
      if (device) {
        device.releaseStock(release.quantity);
        this.devices.set(release.deviceId, device);
      }
    }
  }

  // Utility methods for testing
  clear(): void {
    this.devices.clear();
  }

  addDevice(device: Device): void {
    const props = device.toPersistence();
    const id = props.id || `device-${this.nextId++}`;
    const deviceWithId = Device.fromPersistence({ ...props, id });
    this.devices.set(id, deviceWithId);
  }

  getDeviceCount(): number {
    return this.devices.size;
  }
}
