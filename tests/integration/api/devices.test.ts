/**
 * Integration tests for the devices API endpoints
 * These tests verify the complete request/response flow
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '../../../app/api/v2/devices/route';
import { container } from '../../../src/infrastructure/di/container';
import { MockDeviceRepository } from '../../utils/mock-repositories';
import { DeviceFactory } from '../../utils/test-factories';

// Mock the container to use mock repositories
jest.mock('../../../src/infrastructure/di/container', () => ({
  container: {
    getDeviceService: jest.fn(),
    getDeviceRepository: jest.fn(),
  },
}));

describe('/api/v2/devices', () => {
  let mockRepository: MockDeviceRepository;

  beforeEach(() => {
    mockRepository = new MockDeviceRepository();
    
    // Mock the container to return our mock services
    const mockContainer = container as jest.Mocked<typeof container>;
    mockContainer.getDeviceRepository.mockReturnValue(mockRepository);
    
    // Reset repository for each test
    mockRepository.clear();
  });

  describe('GET /api/v2/devices', () => {
    beforeEach(() => {
      // Add some test devices
      const devices = [
        DeviceFactory.create({
          name: 'MRI Scanner',
          category: 'IMAGING',
          price: { amount: 2000000, currency: 'SAR' },
        }),
        DeviceFactory.create({
          name: 'Heart Monitor',
          category: 'MONITORING',
          price: { amount: 50000, currency: 'SAR' },
        }),
        DeviceFactory.create({
          name: 'Ventilator',
          category: 'RESPIRATORY',
          price: { amount: 80000, currency: 'SAR' },
        }),
      ];

      devices.forEach(device => mockRepository.addDevice(device));
    });

    it('should return all devices with default pagination', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.devices).toHaveLength(3);
      expect(data.data.pagination.current).toBe(1);
      expect(data.correlationId).toBeDefined();
    });

    it('should filter devices by category', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices?category=MONITORING');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.devices).toHaveLength(1);
      expect(data.data.devices[0].name).toBe('Heart Monitor');
    });

    it('should apply pagination correctly', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices?page=1&limit=2');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.devices).toHaveLength(2);
      expect(data.data.pagination.current).toBe(1);
      expect(data.data.pagination.hasNext).toBe(true);
    });

    it('should sort devices by price', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices?sortBy=price&sortOrder=asc');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.devices[0].price.amount).toBe(50000);
      expect(data.data.devices[1].price.amount).toBe(80000);
      expect(data.data.devices[2].price.amount).toBe(2000000);
    });

    it('should search devices by term', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices?searchTerm=heart');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.devices).toHaveLength(1);
      expect(data.data.devices[0].name).toBe('Heart Monitor');
    });

    it('should filter by price range', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices?minPrice=40000&maxPrice=100000');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.devices).toHaveLength(2);
    });

    it('should return only available devices when availableOnly=true', async () => {
      // Add a device with no stock
      const outOfStockDevice = DeviceFactory.create({
        name: 'Out of Stock Device',
        stock: { quantity: 0, reserved: 0 },
      });
      mockRepository.addDevice(outOfStockDevice);

      const request = new NextRequest('http://localhost:3000/api/v2/devices?availableOnly=true');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.devices).toHaveLength(3); // Original 3 devices should be available
    });

    it('should return empty result for non-matching filters', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices?category=NONEXISTENT');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data.devices).toHaveLength(0);
    });
  });

  describe('POST /api/v2/devices', () => {
    const validDeviceData = {
      name: 'New Test Device',
      description: 'A test device for API testing',
      category: 'MONITORING',
      brand: 'TestBrand',
      model: 'TB-200',
      price: { amount: 75000, currency: 'SAR' },
      rentPrice: { amount: 300, currency: 'SAR' },
      stock: { quantity: 5, reserved: 0 },
      specifications: { weight: '2kg' },
      certifications: ['CE'],
    };

    it('should create device successfully with valid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validDeviceData),
      });

      const response = await POST(request, { 
        correlationId: 'test-123', 
        startTime: Date.now(),
        userId: 'admin-123',
        userRole: 'ADMIN'
      } as any);
      
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('New Test Device');
      expect(data.message).toBe('Device created successfully');
      expect(mockRepository.getDeviceCount()).toBe(1);
    });

    it('should return validation error for invalid data', async () => {
      const invalidData = {
        ...validDeviceData,
        name: '', // Invalid: empty name
      };

      const request = new NextRequest('http://localhost:3000/api/v2/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request, { 
        correlationId: 'test-123', 
        startTime: Date.now(),
        userId: 'admin-123',
        userRole: 'ADMIN'
      } as any);

      expect(response.status).toBe(400);
    });

    it('should return validation error for missing required fields', async () => {
      const incompleteData = {
        name: 'Test Device',
        // Missing other required fields
      };

      const request = new NextRequest('http://localhost:3000/api/v2/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incompleteData),
      });

      const response = await POST(request, { 
        correlationId: 'test-123', 
        startTime: Date.now(),
        userId: 'admin-123',
        userRole: 'ADMIN'
      } as any);

      expect(response.status).toBe(400);
    });

    it('should return business rule violation for invalid rent price', async () => {
      const invalidRentPriceData = {
        ...validDeviceData,
        rentPrice: { amount: 10000, currency: 'SAR' }, // Too high (>10% of price)
      };

      const request = new NextRequest('http://localhost:3000/api/v2/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidRentPriceData),
      });

      const response = await POST(request, { 
        correlationId: 'test-123', 
        startTime: Date.now(),
        userId: 'admin-123',
        userRole: 'ADMIN'
      } as any);

      expect(response.status).toBe(422);
    });

    it('should return error for wrong currency', async () => {
      const wrongCurrencyData = {
        ...validDeviceData,
        price: { amount: 75000, currency: 'USD' }, // Wrong currency
      };

      const request = new NextRequest('http://localhost:3000/api/v2/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wrongCurrencyData),
      });

      const response = await POST(request, { 
        correlationId: 'test-123', 
        startTime: Date.now(),
        userId: 'admin-123',
        userRole: 'ADMIN'
      } as any);

      expect(response.status).toBe(400);
    });

    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{ invalid json }',
      });

      const response = await POST(request, { 
        correlationId: 'test-123', 
        startTime: Date.now(),
        userId: 'admin-123',
        userRole: 'ADMIN'
      } as any);

      expect(response.status).toBe(400);
    });
  });

  describe('Error handling', () => {
    it('should handle repository errors gracefully', async () => {
      // Mock repository to throw an error
      jest.spyOn(mockRepository, 'find').mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest('http://localhost:3000/api/v2/devices');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBeDefined();
      expect(data.error.code).toBe('INTERNAL_SERVER_ERROR');
    });

    it('should include correlation ID in error responses', async () => {
      jest.spyOn(mockRepository, 'find').mockRejectedValue(new Error('Test error'));

      const request = new NextRequest('http://localhost:3000/api/v2/devices');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);

      const data = await response.json();
      expect(data.error.correlationId).toBe('test-123');
    });
  });

  describe('Response format', () => {
    it('should return standardized success response format', async () => {
      const request = new NextRequest('http://localhost:3000/api/v2/devices');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(data).toHaveProperty('success');
      expect(data).toHaveProperty('data');
      expect(data).toHaveProperty('correlationId');
      expect(data).toHaveProperty('timestamp');
      expect(data.success).toBe(true);
      expect(typeof data.timestamp).toBe('string');
    });

    it('should return standardized error response format', async () => {
      jest.spyOn(mockRepository, 'find').mockRejectedValue(new Error('Test error'));

      const request = new NextRequest('http://localhost:3000/api/v2/devices');
      const response = await GET(request, { correlationId: 'test-123', startTime: Date.now() } as any);
      const data = await response.json();

      expect(data).toHaveProperty('error');
      expect(data.error).toHaveProperty('code');
      expect(data.error).toHaveProperty('message');
      expect(data.error).toHaveProperty('timestamp');
      expect(data.error).toHaveProperty('correlationId');
    });
  });
});
