import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getDeviceService } from '../../../../../../src/infrastructure/di/container';
import { 
  withErrorHandler, 
  createApiResponse,
  ApiContext 
} from '../../../../../../src/infrastructure/api/middleware';

const AvailabilityQuerySchema = z.object({
  quantity: z.number().int().positive().default(1),
});

// GET /api/v2/devices/[id]/availability - Check device availability
export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async (request: NextRequest, context: ApiContext) => {
    const url = new URL(request.url);
    const { quantity } = AvailabilityQuerySchema.parse({
      quantity: url.searchParams.get('quantity') ? parseInt(url.searchParams.get('quantity')!) : undefined,
    });

    const deviceService = getDeviceService();
    const availability = await deviceService.checkAvailability(params.id, quantity);

    return createApiResponse(availability, {
      correlationId: context.correlationId,
    });
  })(request);
}
