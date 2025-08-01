import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  const params = await context.params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify order belongs to user
    const order = await prisma.order.findFirst({
      where: {
        id: params.orderId,
        userId: session.user.id,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Generate mock tracking data based on order status and creation date
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const daysSinceOrder = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

    const events = [
      {
        id: '1',
        status: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared.',
        timestamp: orderDate.toISOString(),
        isCompleted: true,
      },
    ];

    if (daysSinceOrder >= 1 || order.status !== 'PENDING') {
      events.push({
        id: '2',
        status: 'Processing',
        description: 'Your order is being processed and prepared for shipment.',
        timestamp: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        isCompleted: true,
      });
    }

    if (daysSinceOrder >= 2 || order.status === 'SHIPPED' || order.status === 'DELIVERED') {
      events.push({
        id: '3',
        status: 'Shipped',
        description: 'Your order has been shipped and is on its way.',
        timestamp: new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        isCompleted: true,
      });
    }

    if (daysSinceOrder >= 3 || order.status === 'DELIVERED') {
      events.push({
        id: '4',
        status: 'In Transit',
        description: 'Your package is in transit to the delivery location.',
        timestamp: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        isCompleted: order.status === 'DELIVERED',
      });
    }

    if (daysSinceOrder >= 4 || order.status === 'DELIVERED') {
      events.push({
        id: '5',
        status: 'Out for Delivery',
        description: 'Your package is out for delivery and will arrive today.',
        timestamp: order.status === 'DELIVERED' 
          ? new Date(orderDate.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString()
          : '',
        isCompleted: order.status === 'DELIVERED',
      });
    }

    if (order.status === 'DELIVERED') {
      events.push({
        id: '6',
        status: 'Delivered',
        description: 'Your package has been delivered.',
        timestamp: new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        isCompleted: true,
      });
    } else {
      events.push({
        id: '6',
        status: 'Delivered',
        description: 'Your package has been delivered.',
        timestamp: '',
        isCompleted: false,
      });
    }

    // Calculate estimated delivery
    let estimatedDelivery = '';
    if (order.status === 'DELIVERED') {
      estimatedDelivery = 'Delivered';
    } else {
      const estimatedDate = new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000);
      estimatedDelivery = estimatedDate.toLocaleDateString();
    }

    return NextResponse.json({
      events,
      estimatedDelivery,
      currentStatus: order.status,
    });
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}