import { PrismaClient } from '@prisma/client';
import { Order } from '../../../core/domain/entities/order';
import { OrderRepository, CreateOrderData, UpdateOrderData, OrderFilters } from '../../../core/interfaces/repositories/order-repository';
import { logger } from '../../../shared/logging/logger';

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Order | null> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
        include: {
          orderItems: {
            include: {
              device: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return order ? this.toDomain(order) : null;
    } catch (error) {
      logger.error('Failed to find order by ID', {
        id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async findByCustomerId(
    customerId: string,
    options?: {
      status?: string[];
      limit?: number;
      offset?: number;
      sortBy?: 'createdAt' | 'totalAmount' | 'status';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<{ orders: Order[]; total: number }> {
    try {
      const where = this.buildWhereClause({ customerId, status: options?.status });
      const orderBy = this.buildOrderBy(options?.sortBy, options?.sortOrder);

      const [orders, total] = await Promise.all([
        this.prisma.order.findMany({
          where,
          include: {
            orderItems: {
              include: {
                device: true,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy,
          take: options?.limit,
          skip: options?.offset,
        }),
        this.prisma.order.count({ where }),
      ]);

      return {
        orders: orders.map(order => this.toDomain(order)),
        total,
      };
    } catch (error) {
      logger.error('Failed to find orders by customer ID', {
        customerId,
        options,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async find(
    filters?: OrderFilters,
    options?: {
      limit?: number;
      offset?: number;
      sortBy?: 'createdAt' | 'totalAmount' | 'status';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<{ orders: Order[]; total: number }> {
    try {
      const where = this.buildWhereClause(filters);
      const orderBy = this.buildOrderBy(options?.sortBy, options?.sortOrder);

      const [orders, total] = await Promise.all([
        this.prisma.order.findMany({
          where,
          include: {
            orderItems: {
              include: {
                device: true,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy,
          take: options?.limit,
          skip: options?.offset,
        }),
        this.prisma.order.count({ where }),
      ]);

      return {
        orders: orders.map(order => this.toDomain(order)),
        total,
      };
    } catch (error) {
      logger.error('Failed to find orders', {
        filters,
        options,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async findByStatus(
    status: string,
    options?: { limit?: number; offset?: number }
  ): Promise<{ orders: Order[]; total: number }> {
    return this.find({ status: [status] }, options);
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date,
    options?: {
      status?: string[];
      customerId?: string;
      limit?: number;
      offset?: number;
    }
  ): Promise<{ orders: Order[]; total: number }> {
    return this.find(
      {
        dateRange: { start: startDate, end: endDate },
        status: options?.status,
        customerId: options?.customerId,
      },
      {
        limit: options?.limit,
        offset: options?.offset,
      }
    );
  }

  async findByPaymentId(paymentId: string): Promise<Order | null> {
    try {
      const order = await this.prisma.order.findFirst({
        where: { paymentId },
        include: {
          orderItems: {
            include: {
              device: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return order ? this.toDomain(order) : null;
    } catch (error) {
      logger.error('Failed to find order by payment ID', {
        paymentId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async findByTrackingNumber(trackingNumber: string): Promise<Order | null> {
    try {
      const order = await this.prisma.order.findFirst({
        where: { trackingNumber },
        include: {
          orderItems: {
            include: {
              device: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return order ? this.toDomain(order) : null;
    } catch (error) {
      logger.error('Failed to find order by tracking number', {
        trackingNumber,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async create(orderData: CreateOrderData): Promise<Order> {
    try {
      const order = await this.prisma.order.create({
        data: {
          userId: orderData.customerId,
          status: 'PENDING',
          totalAmount: this.calculateTotalAmount(orderData.items, orderData.taxRate || 0.15),
          orderItems: {
            create: orderData.items.map(item => ({
              deviceId: item.deviceId,
              quantity: item.quantity,
              price: item.unitPrice.amount,
            })),
          },
        },
        include: {
          orderItems: {
            include: {
              device: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return this.toDomain(order);
    } catch (error) {
      logger.error('Failed to create order', {
        customerId: orderData.customerId,
        itemCount: orderData.items.length,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async update(id: string, updateData: UpdateOrderData): Promise<Order> {
    try {
      const order = await this.prisma.order.update({
        where: { id },
        data: {
          status: updateData.status,
          trackingNumber: updateData.trackingNumber,
          // Note: The current schema doesn't have a notes field, would need to add it
        },
        include: {
          orderItems: {
            include: {
              device: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return this.toDomain(order);
    } catch (error) {
      logger.error('Failed to update order', {
        id,
        updateData,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async save(order: Order): Promise<Order> {
    const orderProps = order.toPersistence();
    
    if (orderProps.id) {
      return this.update(orderProps.id, {
        status: orderProps.status as any,
        trackingNumber: orderProps.trackingNumber,
        notes: orderProps.notes,
      });
    } else {
      throw new Error('Cannot save order without ID - use create method instead');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.order.delete({
        where: { id },
      });

      logger.info('Order deleted successfully', { orderId: id });
    } catch (error) {
      logger.error('Failed to delete order', {
        id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.prisma.order.count({
        where: { id },
      });
      return count > 0;
    } catch (error) {
      logger.error('Failed to check order existence', {
        id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async getStatistics(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
    currency: string;
  }> {
    try {
      const [orders, statusCounts] = await Promise.all([
        this.prisma.order.findMany({
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          select: {
            totalAmount: true,
            status: true,
          },
        }),
        this.prisma.order.groupBy({
          by: ['status'],
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          _count: {
            status: true,
          },
        }),
      ]);

      const totalRevenue = orders.reduce(
        (sum, order) => sum + parseFloat(order.totalAmount.toString()),
        0
      );

      const ordersByStatus = statusCounts.reduce(
        (acc, item) => ({
          ...acc,
          [item.status]: item._count.status,
        }),
        {} as Record<string, number>
      );

      return {
        totalOrders: orders.length,
        totalRevenue,
        averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
        ordersByStatus,
        currency: 'SAR',
      };
    } catch (error) {
      logger.error('Failed to get order statistics', {
        startDate,
        endDate,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async getTopSellingDevices(
    startDate: Date,
    endDate: Date,
    limit: number = 10
  ): Promise<Array<{
    deviceId: string;
    deviceName: string;
    totalQuantity: number;
    totalRevenue: number;
  }>> {
    try {
      const result = await this.prisma.orderItem.groupBy({
        by: ['deviceId'],
        where: {
          order: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
            status: {
              in: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'],
            },
          },
        },
        _sum: {
          quantity: true,
          price: true,
        },
        orderBy: {
          _sum: {
            quantity: 'desc',
          },
        },
        take: limit,
      });

      // Get device names
      const deviceIds = result.map(item => item.deviceId);
      const devices = await this.prisma.device.findMany({
        where: { id: { in: deviceIds } },
        select: { id: true, name: true },
      });

      const deviceMap = new Map(devices.map(d => [d.id, d.name]));

      return result.map(item => ({
        deviceId: item.deviceId,
        deviceName: deviceMap.get(item.deviceId) || 'Unknown Device',
        totalQuantity: item._sum.quantity || 0,
        totalRevenue: parseFloat((item._sum.price || 0).toString()),
      }));
    } catch (error) {
      logger.error('Failed to get top selling devices', {
        startDate,
        endDate,
        limit,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async getCustomerSummary(customerId: string): Promise<{
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    currency: string;
    lastOrderDate?: Date;
  }> {
    try {
      const orders = await this.prisma.order.findMany({
        where: { userId: customerId },
        select: {
          totalAmount: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const totalSpent = orders.reduce(
        (sum, order) => sum + parseFloat(order.totalAmount.toString()),
        0
      );

      return {
        totalOrders: orders.length,
        totalSpent,
        averageOrderValue: orders.length > 0 ? totalSpent / orders.length : 0,
        currency: 'SAR',
        lastOrderDate: orders[0]?.createdAt,
      };
    } catch (error) {
      logger.error('Failed to get customer summary', {
        customerId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async findOrdersRequiringAttention(): Promise<Order[]> {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          OR: [
            {
              status: 'PROCESSING',
              createdAt: {
                lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Older than 7 days
              },
            },
            {
              status: 'CONFIRMED',
              createdAt: {
                lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Older than 3 days
              },
            },
          ],
        },
        include: {
          orderItems: {
            include: {
              device: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return orders.map(order => this.toDomain(order));
    } catch (error) {
      logger.error('Failed to find orders requiring attention', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  private toDomain(order: any): Order {
    const items = order.orderItems.map((item: any) => ({
      deviceId: item.deviceId,
      deviceName: item.device.name,
      quantity: item.quantity,
      unitPrice: {
        amount: parseFloat(item.price.toString()),
        currency: 'SAR',
      },
      totalPrice: {
        amount: parseFloat(item.price.toString()) * item.quantity,
        currency: 'SAR',
      },
    }));

    // Calculate subtotal and tax
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice.amount, 0);
    const totalAmount = parseFloat(order.totalAmount.toString());
    const taxAmount = totalAmount - subtotal;

    return Order.fromPersistence({
      id: order.id,
      customerId: order.userId,
      items,
      status: order.status,
      subtotal: { amount: subtotal, currency: 'SAR' },
      taxAmount: { amount: taxAmount, currency: 'SAR' },
      totalAmount: { amount: totalAmount, currency: 'SAR' },
      shippingAddress: {
        name: order.user.name || 'Unknown',
        street: 'Not specified',
        city: 'Not specified',
        state: 'Not specified',
        postalCode: 'Not specified',
        country: 'SA',
      },
      paymentId: order.paymentId,
      trackingNumber: order.trackingNumber,
      notes: undefined, // Would need to add this field to schema
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      confirmedAt: undefined, // Would need to add this field to schema
      shippedAt: undefined, // Would need to add this field to schema
      deliveredAt: undefined, // Would need to add this field to schema
      cancelledAt: undefined, // Would need to add this field to schema
    });
  }

  private buildWhereClause(filters?: OrderFilters): any {
    if (!filters) return {};

    const where: any = {};

    if (filters.customerId) {
      where.userId = filters.customerId;
    }

    if (filters.status && filters.status.length > 0) {
      where.status = { in: filters.status };
    }

    if (filters.dateRange) {
      where.createdAt = {
        gte: filters.dateRange.start,
        lte: filters.dateRange.end,
      };
    }

    if (filters.minAmount !== undefined || filters.maxAmount !== undefined) {
      where.totalAmount = {};
      if (filters.minAmount !== undefined) {
        where.totalAmount.gte = filters.minAmount;
      }
      if (filters.maxAmount !== undefined) {
        where.totalAmount.lte = filters.maxAmount;
      }
    }

    return where;
  }

  private buildOrderBy(sortBy?: string, sortOrder?: string): any {
    const order = sortOrder === 'asc' ? 'asc' : 'desc';

    switch (sortBy) {
      case 'createdAt':
        return { createdAt: order };
      case 'totalAmount':
        return { totalAmount: order };
      case 'status':
        return { status: order };
      default:
        return { createdAt: 'desc' };
    }
  }

  private calculateTotalAmount(items: any[], taxRate: number): number {
    const subtotal = items.reduce((sum, item) => sum + (item.unitPrice.amount * item.quantity), 0);
    const tax = subtotal * taxRate;
    return subtotal + tax;
  }
}
