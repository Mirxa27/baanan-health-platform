import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/db';

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // Get recent notifications based on user role and preferences
    const notifications: Notification[] = [];

    if (session.user.role === 'ADMIN') {
      // Admin notifications
      const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          orderItems: {
            include: {
              device: { select: { name: true } }
            }
          }
        }
      });

      const pendingMaintenance = await prisma.maintenanceRequest.findMany({
        where: { status: 'PENDING' },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true } },
          device: { select: { name: true } }
        }
      });

      // Add order notifications
      recentOrders.forEach(order => {
        notifications.push({
          id: `order-${order.id}`,
          type: 'order',
          title: 'New Order Received',
          message: `Order from ${order.user.name || order.user.email} for ${order.orderItems.length} items`,
          timestamp: order.createdAt,
          priority: order.status === 'PENDING' ? 'high' : 'medium',
          read: false,
        });
      });

      // Add maintenance notifications
      pendingMaintenance.forEach(maintenance => {
        notifications.push({
          id: `maintenance-${maintenance.id}`,
          type: 'maintenance',
          title: 'Maintenance Request',
          message: `${maintenance.device.name} requires maintenance - ${maintenance.description.substring(0, 50)}...`,
          timestamp: maintenance.createdAt,
          priority: 'high',
          read: false,
        });
      });
    } else {
      // Customer notifications
      const userOrders = await prisma.order.findMany({
        where: { userId: session.user.id },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          orderItems: {
            include: {
              device: { select: { name: true } }
            }
          }
        }
      });

      const userRentals = await prisma.rental.findMany({
        where: { userId: session.user.id },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          rentalItems: {
            include: {
              device: { select: { name: true } }
            }
          }
        }
      });

      // Add order status notifications
      userOrders.forEach(order => {
        notifications.push({
          id: `user-order-${order.id}`,
          type: 'order',
          title: `Order ${order.status}`,
          message: `Your order for ${order.orderItems[0]?.device.name || 'items'} is now ${order.status.toLowerCase()}`,
          timestamp: order.updatedAt,
          priority: order.status === 'DELIVERED' ? 'high' : 'medium',
          read: false,
        });
      });

      // Add rental notifications
      userRentals.forEach(rental => {
        const daysUntilReturn = Math.ceil((new Date(rental.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        if (daysUntilReturn <= 3 && daysUntilReturn > 0) {
          notifications.push({
            id: `rental-reminder-${rental.id}`,
            type: 'rental',
            title: 'Rental Return Reminder',
            message: `Please return ${rental.rentalItems[0]?.device.name || 'rental items'} in ${daysUntilReturn} day(s)`,
            timestamp: new Date(),
            priority: daysUntilReturn === 1 ? 'high' : 'medium',
            read: false,
          });
        }
      });
    }

    // Sort notifications by timestamp
    notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      notifications: notifications.slice(0, 10), // Limit to 10 most recent
      unreadCount: notifications.filter(n => !n.read).length,
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { notificationId, action } = await request.json();

    if (action === 'mark_read') {
      // In a real implementation, you would update the notification status in a notifications table
      // For now, we'll just return success
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
