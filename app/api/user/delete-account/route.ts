import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/db';

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Prevent admin from deleting their own account if they're the only admin
    if (session.user.role === 'ADMIN') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' },
      });

      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last admin account' },
          { status: 400 }
        );
      }
    }

    // Delete user and all related data (CASCADE delete)
    // The order is important due to foreign key constraints
    await prisma.$transaction(async (tx) => {
      // Delete customer service messages
      await tx.customerServiceMessage.deleteMany({
        where: {
          chat: {
            userId: session.user.id,
          },
        },
      });

      // Delete customer service chats
      await tx.customerServiceChat.deleteMany({
        where: { userId: session.user.id },
      });

      // Delete maintenance requests
      await tx.maintenanceRequest.deleteMany({
        where: { userId: session.user.id },
      });

      // Delete rental items
      await tx.rentalItem.deleteMany({
        where: {
          rental: {
            userId: session.user.id,
          },
        },
      });

      // Delete rentals
      await tx.rental.deleteMany({
        where: { userId: session.user.id },
      });

      // Delete order items
      await tx.orderItem.deleteMany({
        where: {
          order: {
            userId: session.user.id,
          },
        },
      });

      // Delete orders
      await tx.order.deleteMany({
        where: { userId: session.user.id },
      });

      // Finally, delete the user
      await tx.user.delete({
        where: { id: session.user.id },
      });
    });

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
