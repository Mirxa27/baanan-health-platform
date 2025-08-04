import { Device, DeviceFilters, Money } from '../device';
import { BusinessRuleViolationError } from '../../../../shared/errors/domain-errors';

describe('Device Entity', () => {
  describe('creation', () => {
    it('should create a valid device', () => {
      const device = Device.create({
        name: 'MRI Scanner',
        description: 'High-resolution MRI scanner for medical imaging',
        category: 'IMAGING',
        brand: 'Siemens',
        model: 'Magnetom Vida',
        price: { amount: 2000000, currency: 'SAR' },
        rentPrice: { amount: 5000, currency: 'SAR' },
        stock: { quantity: 1, reserved: 0 },
        isActive: true,
      });

      expect(device.name).toBe('MRI Scanner');
      expect(device.category).toBe('IMAGING');
      expect(device.price.amount).toBe(2000000);
      expect(device.isActive).toBe(true);
    });

    it('should throw error when rent price exceeds 10% of purchase price', () => {
      expect(() => {
        Device.create({
          name: 'Test Device',
          description: 'Test description',
          category: 'MONITORING',
          brand: 'Test Brand',
          model: 'TM-100',
          price: { amount: 1000, currency: 'SAR' },
          rentPrice: { amount: 150, currency: 'SAR' }, // 15% of price
          stock: { quantity: 1, reserved: 0 },
          isActive: true,
        });
      }).toThrow(BusinessRuleViolationError);
    });

    it('should throw error when currencies do not match', () => {
      expect(() => {
        Device.create({
          name: 'Test Device',
          description: 'Test description',
          category: 'MONITORING',
          brand: 'Test Brand',
          model: 'TM-100',
          price: { amount: 1000, currency: 'SAR' },
          rentPrice: { amount: 50, currency: 'USD' },
          stock: { quantity: 1, reserved: 0 },
          isActive: true,
        });
      }).toThrow(BusinessRuleViolationError);
    });

    it('should throw error when reserved stock exceeds total stock', () => {
      expect(() => {
        Device.create({
          name: 'Test Device',
          description: 'Test description',
          category: 'MONITORING',
          brand: 'Test Brand',
          model: 'TM-100',
          price: { amount: 1000, currency: 'SAR' },
          rentPrice: { amount: 50, currency: 'SAR' },
          stock: { quantity: 5, reserved: 10 },
          isActive: true,
        });
      }).toThrow(BusinessRuleViolationError);
    });
  });

  describe('availability checks', () => {
    let device: Device;

    beforeEach(() => {
      device = Device.create({
        name: 'Test Device',
        description: 'Test description',
        category: 'MONITORING',
        brand: 'Test Brand',
        model: 'TM-100',
        price: { amount: 1000, currency: 'SAR' },
        rentPrice: { amount: 50, currency: 'SAR' },
        stock: { quantity: 10, reserved: 3 },
        isActive: true,
      });
    });

    it('should correctly calculate available stock', () => {
      expect(device.availableStock()).toBe(7);
    });

    it('should return true for available purchase when stock is sufficient', () => {
      expect(device.isAvailableForPurchase(5)).toBe(true);
    });

    it('should return false for available purchase when stock is insufficient', () => {
      expect(device.isAvailableForPurchase(10)).toBe(false);
    });

    it('should return false for available purchase when device is inactive', () => {
      device.deactivate();
      expect(device.isAvailableForPurchase(1)).toBe(false);
    });
  });

  describe('stock management', () => {
    let device: Device;

    beforeEach(() => {
      device = Device.create({
        name: 'Test Device',
        description: 'Test description',
        category: 'MONITORING',
        brand: 'Test Brand',
        model: 'TM-100',
        price: { amount: 1000, currency: 'SAR' },
        rentPrice: { amount: 50, currency: 'SAR' },
        stock: { quantity: 10, reserved: 0 },
        isActive: true,
      });
    });

    it('should reserve stock successfully', () => {
      device.reserveStock(5);
      expect(device.stock.reserved).toBe(5);
      expect(device.availableStock()).toBe(5);
    });

    it('should throw error when reserving more stock than available', () => {
      expect(() => {
        device.reserveStock(15);
      }).toThrow(BusinessRuleViolationError);
    });

    it('should release reserved stock successfully', () => {
      device.reserveStock(5);
      device.releaseStock(3);
      expect(device.stock.reserved).toBe(2);
      expect(device.availableStock()).toBe(8);
    });

    it('should throw error when releasing more stock than reserved', () => {
      device.reserveStock(5);
      expect(() => {
        device.releaseStock(10);
      }).toThrow(BusinessRuleViolationError);
    });

    it('should adjust total stock successfully', () => {
      device.adjustStock(15);
      expect(device.stock.quantity).toBe(15);
    });

    it('should throw error when adjusting stock below reserved amount', () => {
      device.reserveStock(5);
      expect(() => {
        device.adjustStock(3);
      }).toThrow(BusinessRuleViolationError);
    });
  });

  describe('price updates', () => {
    let device: Device;

    beforeEach(() => {
      device = Device.create({
        name: 'Test Device',
        description: 'Test description',
        category: 'MONITORING',
        brand: 'Test Brand',
        model: 'TM-100',
        price: { amount: 1000, currency: 'SAR' },
        rentPrice: { amount: 50, currency: 'SAR' },
        stock: { quantity: 10, reserved: 0 },
        isActive: true,
      });
    });

    it('should update price successfully', () => {
      device.updatePrice({ amount: 1200, currency: 'SAR' });
      expect(device.price.amount).toBe(1200);
    });

    it('should throw error when new price would violate rent price rule', () => {
      expect(() => {
        device.updatePrice({ amount: 400, currency: 'SAR' });
      }).toThrow(BusinessRuleViolationError);
    });

    it('should update rent price successfully', () => {
      device.updateRentPrice({ amount: 80, currency: 'SAR' });
      expect(device.rentPrice.amount).toBe(80);
    });

    it('should throw error when rent price exceeds 10% of purchase price', () => {
      expect(() => {
        device.updateRentPrice({ amount: 150, currency: 'SAR' });
      }).toThrow(BusinessRuleViolationError);
    });
  });

  describe('activation/deactivation', () => {
    let device: Device;

    beforeEach(() => {
      device = Device.create({
        name: 'Test Device',
        description: 'Test description',
        category: 'MONITORING',
        brand: 'Test Brand',
        model: 'TM-100',
        price: { amount: 1000, currency: 'SAR' },
        rentPrice: { amount: 50, currency: 'SAR' },
        stock: { quantity: 10, reserved: 0 },
        isActive: true,
      });
    });

    it('should activate device successfully', () => {
      device.deactivate();
      device.activate();
      expect(device.isActive).toBe(true);
    });

    it('should deactivate device successfully when no reserved stock', () => {
      device.deactivate();
      expect(device.isActive).toBe(false);
    });

    it('should throw error when deactivating device with reserved stock', () => {
      device.reserveStock(5);
      expect(() => {
        device.deactivate();
      }).toThrow(BusinessRuleViolationError);
    });
  });
});

describe('DeviceFilters', () => {
  let devices: Device[];

  beforeEach(() => {
    devices = [
      Device.create({
        name: 'MRI Scanner',
        description: 'High-resolution medical imaging',
        category: 'IMAGING',
        brand: 'Siemens',
        model: 'Magnetom Vida',
        price: { amount: 2000000, currency: 'SAR' },
        rentPrice: { amount: 5000, currency: 'SAR' },
        stock: { quantity: 1, reserved: 0 },
        isActive: true,
      }),
      Device.create({
        name: 'Heart Monitor',
        description: 'Continuous heart rate monitoring',
        category: 'MONITORING',
        brand: 'Philips',
        model: 'IntelliVue MX40',
        price: { amount: 50000, currency: 'SAR' },
        rentPrice: { amount: 200, currency: 'SAR' },
        stock: { quantity: 5, reserved: 0 },
        isActive: true,
      }),
      Device.create({
        name: 'Ventilator',
        description: 'Mechanical ventilation support',
        category: 'RESPIRATORY',
        brand: 'Medtronic',
        model: 'PB980',
        price: { amount: 80000, currency: 'SAR' },
        rentPrice: { amount: 300, currency: 'SAR' },
        stock: { quantity: 0, reserved: 0 },
        isActive: true,
      }),
    ];
  });

  it('should filter by category', () => {
    const filters = new DeviceFilters('MONITORING');
    const matches = devices.filter(device => filters.matches(device));
    expect(matches).toHaveLength(1);
    expect(matches[0].name).toBe('Heart Monitor');
  });

  it('should filter by brand', () => {
    const filters = new DeviceFilters(undefined, 'Siemens');
    const matches = devices.filter(device => filters.matches(device));
    expect(matches).toHaveLength(1);
    expect(matches[0].name).toBe('MRI Scanner');
  });

  it('should filter by price range', () => {
    const filters = new DeviceFilters(undefined, undefined, { min: 40000, max: 100000 });
    const matches = devices.filter(device => filters.matches(device));
    expect(matches).toHaveLength(2);
  });

  it('should filter by availability', () => {
    const filters = new DeviceFilters(undefined, undefined, undefined, true);
    const matches = devices.filter(device => filters.matches(device));
    expect(matches).toHaveLength(2); // Ventilator has 0 stock
  });

  it('should filter by search term', () => {
    const filters = new DeviceFilters(undefined, undefined, undefined, false, 'heart monitor');
    const matches = devices.filter(device => filters.matches(device));
    expect(matches).toHaveLength(1);
    expect(matches[0].name).toBe('Heart Monitor');
  });

  it('should combine multiple filters', () => {
    const filters = new DeviceFilters(
      'MONITORING',
      'Philips',
      { min: 40000, max: 60000 },
      true,
      'heart'
    );
    const matches = devices.filter(device => filters.matches(device));
    expect(matches).toHaveLength(1);
    expect(matches[0].name).toBe('Heart Monitor');
  });
});
