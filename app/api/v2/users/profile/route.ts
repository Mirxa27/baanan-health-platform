import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getUserService } from '../../../../../src/infrastructure/di/container';
import { 
  withAuth, 
  withValidation, 
  createApiResponse,
  ApiContext 
} from '../../../../../src/infrastructure/api/middleware';

const UpdateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name too long').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

// GET /api/v2/users/profile - Get current user profile
export const GET = withAuth(async (request: NextRequest, context: ApiContext & { userId: string }) => {
  const userService = getUserService();
  const user = await userService.getUser(context.userId);

  return createApiResponse(user, {
    correlationId: context.correlationId,
  });
});

// PUT /api/v2/users/profile - Update current user profile
export const PUT = withAuth(
  withValidation(
    UpdateProfileSchema,
    async (request: NextRequest, context: ApiContext & { userId: string }, data: z.infer<typeof UpdateProfileSchema>) => {
      const userService = getUserService();
      const user = await userService.updateUser(context.userId, data);

      return createApiResponse(user, {
        correlationId: context.correlationId,
        message: 'Profile updated successfully',
      });
    }
  )
);

// POST /api/v2/users/profile/change-password - Change user password
export const POST = withAuth(
  withValidation(
    ChangePasswordSchema,
    async (request: NextRequest, context: ApiContext & { userId: string }, data: z.infer<typeof ChangePasswordSchema>) => {
      const userService = getUserService();
      await userService.changePassword(context.userId, data.currentPassword, data.newPassword);

      return createApiResponse(null, {
        correlationId: context.correlationId,
        message: 'Password changed successfully',
      });
    }
  )
);
