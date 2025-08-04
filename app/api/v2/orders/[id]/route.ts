import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getOrderService } from '../../../../../src/infrastructure/di/container';
import { 
  withErrorHandler, 
  withAuth, 
  withValidation, 
  createApiResponse,
  ApiContext 
} from '../../../../../src/infrastructure/api/middleware';
import { ForbiddenError } from '../../../../../src/shared/errors/domain-errors';

const UpdateOrderSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']).optional(),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
});

const ConfirmOrderSchema = z.object({
  paymentId: z.string().min(1, 'Payment ID is required'),
});

const CancelOrderSchema = z.object({
  reason: z.string().optional(),
});

// GET /api/v2/orders/[id] - Get order by ID
export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  return withAuth(async (request: NextRequest, context: ApiContext & { userId: string; userRole: string }) => {
    const orderService = getOrderService();
    const order = await orderService.getOrder(params.id);

    // Check if user can access this order
    if (context.userRole === 'CUSTOMER' && order.customerId !== context.userId) {
      throw new ForbiddenError('You can only access your own orders');
    }

    return createApiResponse(order, {
      correlationId: context.correlationId,
    });
  })(request);
}

// PUT /api/v2/orders/[id] - Update order (Admin only)
export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  return withAuth(
    withValidation(
      UpdateOrderSchema,
      async (request: NextRequest, context: ApiContext, data: z.infer<typeof UpdateOrderSchema>) => {
        const orderService = getOrderService();
        const order = await orderService.updateOrder(params.id, data);

        return createApiResponse(order, {
          correlationId: context.correlationId,
          message: 'Order updated successfully',
        });
      }
    ),
    { requireRole: 'ADMIN' }
  )(request);
}

// DELETE /api/v2/orders/[id] - Cancel order
export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  return withAuth(async (request: NextRequest, context: ApiContext & { userId: string; userRole: string }) => {
    const orderService = getOrderService();
    
    // Get order first to check ownership
    const order = await orderService.getOrder(params.id);
    
    // Check if user can cancel this order
    if (context.userRole === 'CUSTOMER' && order.customerId !== context.userId) {
      throw new ForbiddenError('You can only cancel your own orders');
    }

    const cancelledOrder = await orderService.cancelOrder(params.id, 'Cancelled by user');

    return createApiResponse(cancelledOrder, {
      correlationId: context.correlationId,
      message: 'Order cancelled successfully',
    });
  })(request);
}
