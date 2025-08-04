import { Device } from '../../src/core/domain/entities/device';
import { Order } from '../../src/core/domain/entities/order';

export class DeviceFactory {
  static create(overrides: Partial<any> = {}): Device {
    const defaults = {
      name: 'Test Medical Device',
      description: 'A test medical device for testing purposes',
      category: 'MONITORING',
      brand: 'TestBrand',
      model: 'TM-100',
      price: {
        amount: 1000,
        currency: 'SAR',
      },
      rentPrice: {
        amount: 50,
        currency: 'SAR',
      },
      imageUrl: 'https://example.com/device.jpg',
      stock: {
        quantity: 10,
        reserved: 0,
      },
      specifications: {
        weight: '2.5kg',
        dimensions: '30x20x15cm',
      },
      certifications: ['CE', 'FDA'],
      isActive: true,
    };

    return Device.create({
      ...defaults,
      ...overrides,
    });
  }

  static createMultiple(count: number, overrides: Partial<any> = {}): Device[] {
    return Array.from({ length: count }, (_, index) =>
      this.create({
        ...overrides,
        name: `${overrides.name || 'Test Device'} ${index + 1}`,
        model: `${overrides.model || 'TM'}-${100 + index}`,
      })
    );
  }
}

export class OrderFactory {
  static create(overrides: Partial<any> = {}): Order {
    const defaults = {
      customerId: 'customer-123',
      items: [
        {
          deviceId: 'device-123',
          deviceName: 'Test Device',
          quantity: 1,
          unitPrice: { amount: 1000, currency: 'SAR' },
          totalPrice: { amount: 1000, currency: 'SAR' },
        },
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Test Street',
        city: 'Riyadh',
        state: 'Riyadh Province',
        postalCode: '12345',
        country: 'SA',
        phone: '+966501234567',
      },
    };

    return Order.create(
      overrides.customerId || defaults.customerId,
      overrides.items || defaults.items,
      overrides.shippingAddress || defaults.shippingAddress,
      overrides.taxRate || 0.15
    );
  }
}

export class TestDataBuilder {
  static device(): DeviceBuilder {
    return new DeviceBuilder();
  }

  static order(): OrderBuilder {
    return new OrderBuilder();
  }
}

class DeviceBuilder {
  private data: any = {};

  withName(name: string): this {
    this.data.name = name;
    return this;
  }

  withCategory(category: string): this {
    this.data.category = category;
    return this;
  }

  withPrice(amount: number, currency: string = 'SAR'): this {
    this.data.price = { amount, currency };
    return this;
  }

  withRentPrice(amount: number, currency: string = 'SAR'): this {
    this.data.rentPrice = { amount, currency };
    return this;
  }

  withStock(quantity: number, reserved: number = 0): this {
    this.data.stock = { quantity, reserved };
    return this;
  }

  inactive(): this {
    this.data.isActive = false;
    return this;
  }

  build(): Device {
    return DeviceFactory.create(this.data);
  }
}

class OrderBuilder {
  private data: any = {};

  forCustomer(customerId: string): this {
    this.data.customerId = customerId;
    return this;
  }

  withItem(deviceId: string, quantity: number, unitPrice: number): this {
    if (!this.data.items) {
      this.data.items = [];
    }
    this.data.items.push({
      deviceId,
      deviceName: `Device ${deviceId}`,
      quantity,
      unitPrice: { amount: unitPrice, currency: 'SAR' },
      totalPrice: { amount: unitPrice * quantity, currency: 'SAR' },
    });
    return this;
  }

  withShippingAddress(address: any): this {
    this.data.shippingAddress = address;
    return this;
  }

  build(): Order {
    return OrderFactory.create(this.data);
  }
}
