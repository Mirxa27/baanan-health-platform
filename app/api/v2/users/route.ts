import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getUserService } from '../../../../src/infrastructure/di/container';
import { 
  withErrorHandler, 
  withAuth, 
  withValidation, 
  createApiResponse,
  ApiContext 
} from '../../../../src/infrastructure/api/middleware';

// Input validation schemas
const CreateUserSchema = z.object({
  email: z.string().email('Valid email is required'),
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  phone: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['CUSTOMER', 'ADMIN']).default('CUSTOMER'),
});

const SearchUsersSchema = z.object({
  role: z.enum(['CUSTOMER', 'ADMIN']).optional(),
  isActive: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  searchTerm: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'email', 'createdAt', 'lastLoginAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// GET /api/v2/users - Search and list users (Admin only)
export const GET = withAuth(async (request: NextRequest, context: ApiContext) => {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());
  
  // Parse and validate query parameters
  const {
    role,
    isActive,
    emailVerified,
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
  } = SearchUsersSchema.parse({
    ...searchParams,
    page: searchParams.page ? parseInt(searchParams.page) : undefined,
    limit: searchParams.limit ? parseInt(searchParams.limit) : undefined,
    isActive: searchParams.isActive ? searchParams.isActive === 'true' : undefined,
    emailVerified: searchParams.emailVerified ? searchParams.emailVerified === 'true' : undefined,
  });

  const userService = getUserService();
  
  // Build filters
  const filters: any = {};
  if (role) filters.role = role;
  if (isActive !== undefined) filters.isActive = isActive;
  if (emailVerified !== undefined) filters.emailVerified = emailVerified;
  if (searchTerm) filters.searchTerm = searchTerm;

  const result = await userService.searchUsers({
    filters,
    pagination: { page, limit },
    sorting: { field: sortBy, order: sortOrder },
  });

  return createApiResponse(result, {
    correlationId: context.correlationId,
    message: `Found ${result.users.length} users`,
  });
}, { requireRole: 'ADMIN' });

// POST /api/v2/users - Create new user (Admin only)
export const POST = withAuth(
  withValidation(
    CreateUserSchema,
    async (request: NextRequest, context: ApiContext, data: z.infer<typeof CreateUserSchema>) => {
      const userService = getUserService();
      
      const user = await userService.createUser(data);

      return createApiResponse(user, {
        status: 201,
        correlationId: context.correlationId,
        message: 'User created successfully',
      });
    }
  ),
  { requireRole: 'ADMIN' }
);
