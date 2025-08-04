import { DeviceApplicationService } from '../device-application-service';
import { MockDeviceRepository } from '../../../../../tests/utils/mock-repositories';
import { DeviceFactory, TestDataBuilder } from '../../../../../tests/utils/test-factories';
import { ValidationError, NotFoundError, BusinessRuleViolationError } from '../../../../shared/errors/domain-errors';

describe('DeviceApplicationService', () => {
  let deviceService: DeviceApplicationService;
  let mockRepository: MockDeviceRepository;

  beforeEach(() => {
    mockRepository = new MockDeviceRepository();
    deviceService = new DeviceApplicationService(mockRepository);
  });

  afterEach(() => {
    mockRepository.clear();
  });

  describe('createDevice', () => {
    const validCreateRequest = {
      name: 'Test MRI Scanner',
      description: 'High-resolution MRI scanner for medical imaging',
      category: 'IMAGING',
      brand: 'Siemens',
      model: 'Magnetom Vida',
      price: { amount: 2000000, currency: 'SAR' },
      rentPrice: { amount: 5000, currency: 'SAR' },
      stock: { quantity: 1, reserved: 0 },
      specifications: { weight: '1500kg' },
      certifications: ['CE', 'FDA'],
    };

    it('should create device successfully with valid data', async () => {
      const device = await deviceService.createDevice(validCreateRequest);

      expect(device.name).toBe('Test MRI Scanner');
      expect(device.category).toBe('IMAGING');
      expect(device.price.amount).toBe(2000000);
      expect(mockRepository.getDeviceCount()).toBe(1);
    });

    it('should throw validation error for empty name', async () => {
      const request = { ...validCreateRequest, name: '' };
      
      await expect(deviceService.createDevice(request))
        .rejects.toThrow(ValidationError);
    });

    it('should throw validation error for empty category', async () => {
      const request = { ...validCreateRequest, category: '' };
      
      await expect(deviceService.createDevice(request))
        .rejects.toThrow(ValidationError);
    });

    it('should throw validation error for negative price', async () => {
      const request = { 
        ...validCreateRequest, 
        price: { amount: -100, currency: 'SAR' } 
      };
      
      await expect(deviceService.createDevice(request))
        .rejects.toThrow(ValidationError);
    });

    it('should throw validation error for wrong currency', async () => {
      const request = { 
        ...validCreateRequest, 
        price: { amount: 1000, currency: 'USD' } 
      };
      
      await expect(deviceService.createDevice(request))
        .rejects.toThrow(ValidationError);
    });

    it('should throw business rule violation for rent price too high', async () => {
      const request = { 
        ...validCreateRequest,
        rentPrice: { amount: 300000, currency: 'SAR' } // 15% of price
      };
      
      await expect(deviceService.createDevice(request))
        .rejects.toThrow(BusinessRuleViolationError);
    });
  });

  describe('getDevice', () => {
    it('should return device when found', async () => {
      const device = DeviceFactory.create();
      mockRepository.addDevice(device);
      const deviceId = device.id;

      const foundDevice = await deviceService.getDevice(deviceId);

      expect(foundDevice.name).toBe(device.name);
    });

    it('should throw NotFoundError when device does not exist', async () => {
      await expect(deviceService.getDevice('non-existent-id'))
        .rejects.toThrow(NotFoundError);
    });

    it('should throw ValidationError for empty ID', async () => {
      await expect(deviceService.getDevice(''))
        .rejects.toThrow(ValidationError);
    });
  });

  describe('updateDevice', () => {
    let existingDevice: any;

    beforeEach(async () => {
      const device = DeviceFactory.create();
      mockRepository.addDevice(device);
      existingDevice = device;
    });

    it('should update device price successfully', async () => {
      const updateRequest = {
        price: { amount: 1500, currency: 'SAR' },
      };

      const updatedDevice = await deviceService.updateDevice(existingDevice.id, updateRequest);

      expect(updatedDevice.price.amount).toBe(1500);
    });

    it('should update device rent price successfully', async () => {
      const updateRequest = {
        rentPrice: { amount: 75, currency: 'SAR' },
      };

      const updatedDevice = await deviceService.updateDevice(existingDevice.id, updateRequest);

      expect(updatedDevice.rentPrice.amount).toBe(75);
    });

    it('should throw error when updating price violates business rules', async () => {
      const updateRequest = {
        price: { amount: 400, currency: 'SAR' }, // Would make rent price > 10%
      };

      await expect(deviceService.updateDevice(existingDevice.id, updateRequest))
        .rejects.toThrow(BusinessRuleViolationError);
    });
  });

  describe('deleteDevice', () => {
    let existingDevice: any;

    beforeEach(async () => {
      const device = DeviceFactory.create();
      mockRepository.addDevice(device);
      existingDevice = device;
    });

    it('should delete device successfully', async () => {
      await deviceService.deleteDevice(existingDevice.id);

      const deviceExists = await mockRepository.exists(existingDevice.id);
      expect(deviceExists).toBe(false);
    });

    it('should throw error when deleting device with reserved stock', async () => {
      existingDevice.reserveStock(1);
      mockRepository.addDevice(existingDevice);

      await expect(deviceService.deleteDevice(existingDevice.id))
        .rejects.toThrow(BusinessRuleViolationError);
    });
  });

  describe('searchDevices', () => {
    beforeEach(() => {
      const devices = [
        TestDataBuilder.device()
          .withName('MRI Scanner')
          .withCategory('IMAGING')
          .withPrice(2000000)
          .build(),
        TestDataBuilder.device()
          .withName('Heart Monitor')
          .withCategory('MONITORING')
          .withPrice(50000)
          .build(),
        TestDataBuilder.device()
          .withName('Ventilator')
          .withCategory('RESPIRATORY')
          .withPrice(80000)
          .withStock(0)
          .build(),
      ];

      devices.forEach(device => mockRepository.addDevice(device));
    });

    it('should return all devices when no filters applied', async () => {
      const result = await deviceService.searchDevices({});

      expect(result.devices).toHaveLength(3);
      expect(result.pagination.total).toBe(1);
    });

    it('should filter devices by category', async () => {
      const filters = { category: 'MONITORING' };
      const result = await deviceService.searchDevices({ filters });

      expect(result.devices).toHaveLength(1);
      expect(result.devices[0].name).toBe('Heart Monitor');
    });

    it('should apply pagination correctly', async () => {
      const result = await deviceService.searchDevices({
        pagination: { page: 1, limit: 2 },
      });

      expect(result.devices).toHaveLength(2);
      expect(result.pagination.current).toBe(1);
      expect(result.pagination.hasNext).toBe(true);
    });

    it('should sort devices by price', async () => {
      const result = await deviceService.searchDevices({
        sorting: { field: 'price', order: 'asc' },
      });

      expect(result.devices[0].price.amount).toBe(50000);
      expect(result.devices[1].price.amount).toBe(80000);
      expect(result.devices[2].price.amount).toBe(2000000);
    });
  });

  describe('checkAvailability', () => {
    let device: any;

    beforeEach(() => {
      device = TestDataBuilder.device()
        .withStock(10, 3)
        .build();
      mockRepository.addDevice(device);
    });

    it('should return available when sufficient stock', async () => {
      const result = await deviceService.checkAvailability(device.id, 5);

      expect(result.available).toBe(true);
      expect(result.stockLevel).toBe(7);
    });

    it('should return unavailable when insufficient stock', async () => {
      const result = await deviceService.checkAvailability(device.id, 10);

      expect(result.available).toBe(false);
      expect(result.stockLevel).toBe(7);
    });
  });

  describe('stock operations', () => {
    let device: any;

    beforeEach(() => {
      device = TestDataBuilder.device()
        .withStock(10, 0)
        .build();
      mockRepository.addDevice(device);
    });

    it('should reserve stock successfully', async () => {
      await deviceService.reserveStock(device.id, 5);

      const updatedDevice = await mockRepository.findById(device.id);
      expect(updatedDevice!.stock.reserved).toBe(5);
    });

    it('should release stock successfully', async () => {
      await deviceService.reserveStock(device.id, 5);
      await deviceService.releaseStock(device.id, 3);

      const updatedDevice = await mockRepository.findById(device.id);
      expect(updatedDevice!.stock.reserved).toBe(2);
    });

    it('should update stock quantities', async () => {
      const updates = [
        { deviceId: device.id, quantity: 15, operation: 'set' as const },
      ];

      await deviceService.updateStock(updates);

      const updatedDevice = await mockRepository.findById(device.id);
      expect(updatedDevice!.stock.quantity).toBe(15);
    });
  });

  describe('device metadata', () => {
    beforeEach(() => {
      const devices = [
        TestDataBuilder.device().withCategory('IMAGING').withPrice(100000).build(),
        TestDataBuilder.device().withCategory('MONITORING').withPrice(50000).build(),
        TestDataBuilder.device().withCategory('MONITORING').withPrice(80000).inactive().build(),
      ];

      devices.forEach(device => mockRepository.addDevice(device));
    });

    it('should return correct metadata', async () => {
      const metadata = await deviceService.getDeviceMetadata();

      expect(metadata.categories).toContain('IMAGING');
      expect(metadata.categories).toContain('MONITORING');
      expect(metadata.totalDevices).toBe(3);
      expect(metadata.activeDevices).toBe(2);
      expect(metadata.priceRange.min).toBe(50000);
      expect(metadata.priceRange.max).toBe(100000);
    });
  });
});
