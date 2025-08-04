import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getOrderService } from '../../../../src/infrastructure/di/container';
import { 
  withErrorHandler, 
  withAuth, 
  withValidation, 
  createApiResponse,
  ApiContext 
} from '../../../../src/infrastructure/api/middleware';

// Input validation schemas
const CreateOrderSchema = z.object({
  items: z.array(z.object({
    deviceId: z.string().min(1, 'Device ID is required'),
    deviceName: z.string().min(1, 'Device name is required'),
    quantity: z.number().int().positive('Quantity must be positive'),
    unitPrice: z.object({
      amount: z.number().positive('Unit price must be positive'),
      currency: z.string().length(3, 'Currency must be 3 characters'),
    }),
  })).min(1, 'Order must contain at least one item'),
  shippingAddress: z.object({
    name: z.string().min(1, 'Name is required'),
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().optional(),
  }),
  taxRate: z.number().min(0).max(1).default(0.15), // 15% VAT in Saudi Arabia
});

const SearchOrdersSchema = z.object({
  customerId: z.string().optional(),
  status: z.array(z.string()).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'totalAmount', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// GET /api/v2/orders - Search and list orders
export const GET = withAuth(async (request: NextRequest, context: ApiContext & { userId: string; userRole: string }) => {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());
  
  // Parse and validate query parameters
  const {
    customerId,
    status,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    page,
    limit,
    sortBy,
    sortOrder,
  } = SearchOrdersSchema.parse({
    ...searchParams,
    page: searchParams.page ? parseInt(searchParams.page) : undefined,
    limit: searchParams.limit ? parseInt(searchParams.limit) : undefined,
    minAmount: searchParams.minAmount ? parseFloat(searchParams.minAmount) : undefined,
    maxAmount: searchParams.maxAmount ? parseFloat(searchParams.maxAmount) : undefined,
    status: searchParams.status ? searchParams.status.split(',') : undefined,
  });

  const orderService = getOrderService();
  
  // Build filters
  const filters: any = {};
  
  // For customers, only show their own orders
  if (context.userRole === 'CUSTOMER') {
    filters.customerId = context.userId;
  } else if (customerId) {
    // Admins can filter by specific customer
    filters.customerId = customerId;
  }

  if (status && status.length > 0) {
    filters.status = status;
  }

  if (startDate && endDate) {
    filters.dateRange = {
      start: new Date(startDate),
      end: new Date(endDate),
    };
  }

  if (minAmount !== undefined) {
    filters.minAmount = minAmount;
  }

  if (maxAmount !== undefined) {
    filters.maxAmount = maxAmount;
  }

  const result = await orderService.searchOrders({
    filters,
    pagination: { page, limit },
    sorting: { field: sortBy, order: sortOrder },
  });

  return createApiResponse(result, {
    correlationId: context.correlationId,
    message: `Found ${result.orders.length} orders`,
  });
});

// POST /api/v2/orders - Create new order
export const POST = withAuth(
  withValidation(
    CreateOrderSchema,
    async (request: NextRequest, context: ApiContext & { userId: string }, data: z.infer<typeof CreateOrderSchema>) => {
      const orderService = getOrderService();
      
      // Calculate total price for each item
      const itemsWithTotals = data.items.map(item => ({
        ...item,
        totalPrice: {
          amount: item.unitPrice.amount * item.quantity,
          currency: item.unitPrice.currency,
        },
      }));

      const orderData = {
        customerId: context.userId,
        items: itemsWithTotals,
        shippingAddress: data.shippingAddress,
        taxRate: data.taxRate,
      };

      const order = await orderService.createOrder(orderData);

      return createApiResponse(order, {
        status: 201,
        correlationId: context.correlationId,
        message: 'Order created successfully',
      });
    }
  )
);
