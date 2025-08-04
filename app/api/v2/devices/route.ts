import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getDeviceService } from '../../../../src/infrastructure/di/container';
import { 
  withErrorHandler, 
  withAuth, 
  withValidation, 
  createApiResponse,
  ApiContext 
} from '../../../../src/infrastructure/api/middleware';
import { DeviceFilters } from '../../../../src/core/domain/entities/device';

// Input validation schemas
const CreateDeviceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description too long'),
  category: z.enum(['IMAGING', 'MONITORING', 'EMERGENCY', 'RESPIRATORY', 'MOBILITY', 'SURGICAL', 'LABORATORY', 'DIAGNOSTIC']),
  brand: z.string().min(1, 'Brand is required').max(100, 'Brand too long'),
  model: z.string().min(1, 'Model is required').max(100, 'Model too long'),
  price: z.object({
    amount: z.number().positive('Price must be positive'),
    currency: z.string().length(3, 'Currency must be 3 characters'),
  }),
  rentPrice: z.object({
    amount: z.number().positive('Rent price must be positive'),
    currency: z.string().length(3, 'Currency must be 3 characters'),
  }),
  imageUrl: z.string().url().optional(),
  stock: z.object({
    quantity: z.number().int().min(0, 'Stock cannot be negative'),
    reserved: z.number().int().min(0, 'Reserved stock cannot be negative').optional(),
  }),
  specifications: z.record(z.unknown()).optional(),
  certifications: z.array(z.string()).optional(),
});

const SearchDevicesSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  priceRange: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
  }).optional(),
  availableOnly: z.boolean().default(false),
  searchTerm: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'price', 'rentPrice', 'createdAt']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// GET /api/v2/devices - Search and list devices
export const GET = withErrorHandler(async (request: NextRequest, context: ApiContext) => {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());
  
  // Parse and validate query parameters
  const {
    category,
    brand,
    priceRange,
    availableOnly,
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
  } = SearchDevicesSchema.parse({
    ...searchParams,
    page: searchParams.page ? parseInt(searchParams.page) : undefined,
    limit: searchParams.limit ? parseInt(searchParams.limit) : undefined,
    availableOnly: searchParams.availableOnly === 'true',
    priceRange: searchParams.minPrice || searchParams.maxPrice ? {
      min: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
      max: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
    } : undefined,
  });

  const deviceService = getDeviceService();
  
  // Create filters
  const filters = new DeviceFilters(
    category as any,
    brand,
    priceRange,
    availableOnly,
    searchTerm
  );

  const result = await deviceService.searchDevices({
    filters,
    searchTerm,
    pagination: { page, limit },
    sorting: { field: sortBy, order: sortOrder },
  });

  return createApiResponse(result, {
    correlationId: context.correlationId,
    message: `Found ${result.devices.length} devices`,
  });
});

// POST /api/v2/devices - Create new device (Admin only)
export const POST = withAuth(
  withValidation(
    CreateDeviceSchema,
    async (request: NextRequest, context: ApiContext, data: z.infer<typeof CreateDeviceSchema>) => {
      const deviceService = getDeviceService();
      
      const device = await deviceService.createDevice(data);

      return createApiResponse(device, {
        status: 201,
        correlationId: context.correlationId,
        message: 'Device created successfully',
      });
    }
  ),
  { requireRole: 'ADMIN' }
);
