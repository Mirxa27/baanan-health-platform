import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (range) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Get total revenue from orders
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
        status: {
          in: ['CONFIRMED', 'SHIPPED', 'DELIVERED'],
        },
      },
      include: {
        orderItems: {
          include: {
            device: true,
          },
        },
      },
    });

    // Get total revenue from rentals
    const rentals = await prisma.rental.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
        status: {
          in: ['ACTIVE', 'COMPLETED'],
        },
      },
      include: {
        rentalItems: {
          include: {
            device: true,
          },
        },
      },
    });

    // Calculate metrics - convert Decimal to number for calculations
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0) +
                        rentals.reduce((sum, rental) => sum + Number(rental.totalAmount), 0);
    
    const totalOrders = orders.length;
    const totalRentals = rentals.filter(r => r.status === 'ACTIVE').length;
    
    const totalDevices = await prisma.device.count();

    // Get previous period data for growth calculation
    const prevStartDate = new Date(startDate);
    const daysDiff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    prevStartDate.setDate(startDate.getDate() - daysDiff);

    const prevOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: prevStartDate,
          lt: startDate,
        },
        status: {
          in: ['CONFIRMED', 'SHIPPED', 'DELIVERED'],
        },
      },
    });

    const prevRentals = await prisma.rental.findMany({
      where: {
        createdAt: {
          gte: prevStartDate,
          lt: startDate,
        },
        status: {
          in: ['ACTIVE', 'COMPLETED'],
        },
      },
    });

    const prevRevenue = prevOrders.reduce((sum, order) => sum + Number(order.totalAmount), 0) +
                       prevRentals.reduce((sum, rental) => sum + Number(rental.totalAmount), 0);
    
    const revenueGrowth = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;
    const orderGrowth = prevOrders.length > 0 ? ((totalOrders - prevOrders.length) / prevOrders.length) * 100 : 0;

    // Generate monthly revenue data
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date();
      monthStart.setMonth(now.getMonth() - i, 1);
      monthStart.setHours(0, 0, 0, 0);
      
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthStart.getMonth() + 1);
      
      const monthOrders = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: monthStart,
            lt: monthEnd,
          },
          status: {
            in: ['CONFIRMED', 'SHIPPED', 'DELIVERED'],
          },
        },
      });

      const monthRentals = await prisma.rental.findMany({
        where: {
          createdAt: {
            gte: monthStart,
            lt: monthEnd,
          },
          status: {
            in: ['ACTIVE', 'COMPLETED'],
          },
        },
      });

      const monthRevenue = monthOrders.reduce((sum, order) => sum + Number(order.totalAmount), 0) +
                          monthRentals.reduce((sum, rental) => sum + Number(rental.totalAmount), 0);

      monthlyRevenue.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        revenue: monthRevenue,
        orders: monthOrders.length + monthRentals.length,
      });
    }

    // Get top devices
    const deviceSales = new Map();
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        const key = item.device.name;
        if (deviceSales.has(key)) {
          const existing = deviceSales.get(key);
          deviceSales.set(key, {
            name: key,
            sales: existing.sales + item.quantity,
            revenue: existing.revenue + (item.price * item.quantity),
          });
        } else {
          deviceSales.set(key, {
            name: key,
            sales: item.quantity,
            revenue: item.price * item.quantity,
          });
        }
      });
    });

    const topDevices = Array.from(deviceSales.values())
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Get category distribution
    const categoryCount = new Map();
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        const category = item.device.category;
        categoryCount.set(category, (categoryCount.get(category) || 0) + item.quantity);
      });
    });

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    const categoryDistribution = Array.from(categoryCount.entries())
      .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length],
      }));

    // Get maintenance requests
    const maintenanceRequests = await prisma.maintenanceRequest.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    const maintenanceStats = maintenanceRequests.map(item => ({
      status: item.status,
      count: item._count.status,
    }));

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalRentals,
      totalDevices,
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
      orderGrowth: Math.round(orderGrowth * 10) / 10,
      monthlyRevenue,
      topDevices,
      categoryDistribution,
      maintenanceRequests: maintenanceStats,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
