import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getDeviceService } from '../../../../../src/infrastructure/di/container';
import { 
  withErrorHandler, 
  withAuth, 
  withValidation, 
  createApiResponse,
  ApiContext 
} from '../../../../../src/infrastructure/api/middleware';

const UpdateDeviceSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(2000).optional(),
  category: z.enum(['IMAGING', 'MONITORING', 'EMERGENCY', 'RESPIRATORY', 'MOBILITY', 'SURGICAL', 'LABORATORY', 'DIAGNOSTIC']).optional(),
  brand: z.string().min(1).max(100).optional(),
  model: z.string().min(1).max(100).optional(),
  price: z.object({
    amount: z.number().positive(),
    currency: z.string().length(3),
  }).optional(),
  rentPrice: z.object({
    amount: z.number().positive(),
    currency: z.string().length(3),
  }).optional(),
  imageUrl: z.string().url().optional(),
  specifications: z.record(z.unknown()).optional(),
  certifications: z.array(z.string()).optional(),
});

const StockUpdateSchema = z.object({
  operation: z.enum(['set', 'add', 'subtract']),
  quantity: z.number().int().min(0),
});

// GET /api/v2/devices/[id] - Get device by ID
export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async (request: NextRequest, context: ApiContext) => {
    const deviceService = getDeviceService();
    const device = await deviceService.getDevice(params.id);

    return createApiResponse(device, {
      correlationId: context.correlationId,
    });
  })(request);
}

// PUT /api/v2/devices/[id] - Update device (Admin only)
export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  return withAuth(
    withValidation(
      UpdateDeviceSchema,
      async (request: NextRequest, context: ApiContext, data: z.infer<typeof UpdateDeviceSchema>) => {
        const deviceService = getDeviceService();
        const device = await deviceService.updateDevice(params.id, data);

        return createApiResponse(device, {
          correlationId: context.correlationId,
          message: 'Device updated successfully',
        });
      }
    ),
    { requireRole: 'ADMIN' }
  )(request);
}

// DELETE /api/v2/devices/[id] - Delete device (Admin only)
export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  return withAuth(async (request: NextRequest, context: ApiContext) => {
    const deviceService = getDeviceService();
    await deviceService.deleteDevice(params.id);

    return createApiResponse(null, {
      status: 204,
      correlationId: context.correlationId,
      message: 'Device deleted successfully',
    });
  }, { requireRole: 'ADMIN' })(request);
}

// POST /api/v2/devices/[id]/stock - Update device stock (Admin only)
export async function POST(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  return withAuth(
    withValidation(
      StockUpdateSchema,
      async (request: NextRequest, context: ApiContext, data: z.infer<typeof StockUpdateSchema>) => {
        const deviceService = getDeviceService();
        
        await deviceService.updateStock([{
          deviceId: params.id,
          quantity: data.quantity,
          operation: data.operation,
        }]);

        const updatedDevice = await deviceService.getDevice(params.id);

        return createApiResponse(updatedDevice, {
          correlationId: context.correlationId,
          message: 'Stock updated successfully',
        });
      }
    ),
    { requireRole: 'ADMIN' }
  )(request);
}
