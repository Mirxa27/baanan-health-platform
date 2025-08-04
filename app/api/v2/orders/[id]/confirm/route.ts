import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getOrderService } from '../../../../../../src/infrastructure/di/container';
import { 
  withAuth, 
  withValidation, 
  createApiResponse,
  ApiContext 
} from '../../../../../../src/infrastructure/api/middleware';
import { ForbiddenError } from '../../../../../../src/shared/errors/domain-errors';

const ConfirmOrderSchema = z.object({
  paymentId: z.string().min(1, 'Payment ID is required'),
});

// POST /api/v2/orders/[id]/confirm - Confirm order with payment
export async function POST(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  return withAuth(
    withValidation(
      ConfirmOrderSchema,
      async (request: NextRequest, context: ApiContext & { userId: string; userRole: string }, data: z.infer<typeof ConfirmOrderSchema>) => {
        const orderService = getOrderService();
        
        // Get order first to check ownership
        const order = await orderService.getOrder(params.id);
        
        // Check if user can confirm this order (usually customers confirm their own orders)
        if (context.userRole === 'CUSTOMER' && order.customerId !== context.userId) {
          throw new ForbiddenError('You can only confirm your own orders');
        }

        const confirmedOrder = await orderService.confirmOrder(params.id, data.paymentId);

        return createApiResponse(confirmedOrder, {
          correlationId: context.correlationId,
          message: 'Order confirmed successfully',
        });
      }
    )
  )(request);
}
