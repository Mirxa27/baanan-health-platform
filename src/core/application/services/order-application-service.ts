import { Order } from '../../domain/entities/order';
import { OrderRepository, CreateOrderData, UpdateOrderData, OrderFilters } from '../../interfaces/repositories/order-repository';
import { DeviceRepository } from '../../interfaces/repositories/device-repository';
import { NotFoundError, ValidationError, BusinessRuleViolationError } from '../../../shared/errors/domain-errors';
import { logger } from '../../../shared/logging/logger';
import { config } from '../../../infrastructure/config/app-config';

export interface OrderSearchRequest {
  filters?: OrderFilters;
  pagination?: {
    page: number;
    limit: number;
  };
  sorting?: {
    field: 'createdAt' | 'totalAmount' | 'status';
    order: 'asc' | 'desc';
  };
}

export interface OrderSearchResponse {
  orders: Order[];
  pagination: {
    current: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  summary: {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
  };
}

export class OrderApplicationService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly deviceRepository: DeviceRepository
  ) {}

  async createOrder(orderData: CreateOrderData): Promise<Order> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Order Creation Started', {
      customerId: orderData.customerId,
      itemCount: orderData.items.length,
    }, correlationId);

    try {
      // Validate order data
      await this.validateCreateOrderData(orderData);

      // Check device availability and reserve stock
      for (const item of orderData.items) {
        const device = await this.deviceRepository.findById(item.deviceId);
        if (!device) {
          throw new NotFoundError('Device', item.deviceId);
        }

        if (!device.isAvailableForPurchase(item.quantity)) {
          throw new BusinessRuleViolationError(
            'INSUFFICIENT_STOCK',
            `Device ${device.name} has insufficient stock. Available: ${device.availableStock()}, Requested: ${item.quantity}`
          );
        }

        // Reserve stock for the order
        device.reserveStock(item.quantity);
        await this.deviceRepository.save(device);
      }

      // Create the order
      const order = await this.orderRepository.create(orderData);

      logger.businessEvent('Order Created Successfully', {
        orderId: order.id,
        customerId: order.customerId,
        totalAmount: order.totalAmount.amount,
        currency: order.totalAmount.currency,
      }, correlationId);

      return order;
    } catch (error) {
      logger.error('Order Creation Failed', {
        customerId: orderData.customerId,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);

      // Release reserved stock on failure
      for (const item of orderData.items) {
        try {
          const device = await this.deviceRepository.findById(item.deviceId);
          if (device && device.stock.reserved >= item.quantity) {
            device.releaseStock(item.quantity);
            await this.deviceRepository.save(device);
          }
        } catch (releaseError) {
          logger.error('Failed to release stock on order creation failure', {
            deviceId: item.deviceId,
            quantity: item.quantity,
            error: releaseError instanceof Error ? releaseError.message : 'Unknown error',
          }, correlationId);
        }
      }

      throw error;
    }
  }

  async getOrder(id: string): Promise<Order> {
    if (!id) {
      throw new ValidationError('Order ID is required');
    }

    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundError('Order', id);
    }

    return order;
  }

  async updateOrder(id: string, updateData: UpdateOrderData): Promise<Order> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Order Update Started', { orderId: id }, correlationId);

    try {
      const order = await this.getOrder(id);

      // Validate status transitions
      if (updateData.status && updateData.status !== order.status) {
        this.validateStatusTransition(order.status, updateData.status);
      }

      const updatedOrder = await this.orderRepository.update(id, updateData);

      logger.businessEvent('Order Updated Successfully', {
        orderId: id,
        newStatus: updateData.status,
      }, correlationId);

      return updatedOrder;
    } catch (error) {
      logger.error('Order Update Failed', {
        orderId: id,
        updateData,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);
      throw error;
    }
  }

  async confirmOrder(id: string, paymentId: string): Promise<Order> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Order Confirmation Started', { orderId: id, paymentId }, correlationId);

    try {
      const order = await this.getOrder(id);

      if (!order.canBeConfirmed()) {
        throw new BusinessRuleViolationError(
          'INVALID_ORDER_STATUS',
          `Cannot confirm order in ${order.status} status`
        );
      }

      // Update order status to confirmed
      const confirmedOrder = await this.orderRepository.update(id, {
        status: 'CONFIRMED',
        notes: order.notes ? `${order.notes}\nPayment confirmed: ${paymentId}` : `Payment confirmed: ${paymentId}`,
      });

      // Convert reserved stock to sold
      for (const item of order.items) {
        const device = await this.deviceRepository.findById(item.deviceId);
        if (device) {
          device.releaseStock(item.quantity);
          device.adjustStock(device.stock.quantity - item.quantity);
          await this.deviceRepository.save(device);
        }
      }

      logger.businessEvent('Order Confirmed Successfully', {
        orderId: id,
        paymentId,
        totalAmount: confirmedOrder.totalAmount.amount,
      }, correlationId);

      return confirmedOrder;
    } catch (error) {
      logger.error('Order Confirmation Failed', {
        orderId: id,
        paymentId,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);
      throw error;
    }
  }

  async cancelOrder(id: string, reason?: string): Promise<Order> {
    const correlationId = this.generateCorrelationId();
    
    logger.businessEvent('Order Cancellation Started', { orderId: id, reason }, correlationId);

    try {
      const order = await this.getOrder(id);

      if (!order.canBeCancelled()) {
        throw new BusinessRuleViolationError(
          'INVALID_ORDER_STATUS',
          `Cannot cancel order in ${order.status} status`
        );
      }

      // Release reserved stock
      for (const item of order.items) {
        const device = await this.deviceRepository.findById(item.deviceId);
        if (device && device.stock.reserved >= item.quantity) {
          device.releaseStock(item.quantity);
          await this.deviceRepository.save(device);
        }
      }

      const cancelledOrder = await this.orderRepository.update(id, {
        status: 'CANCELLED',
        notes: reason ? `Cancelled: ${reason}` : 'Order cancelled',
      });

      logger.businessEvent('Order Cancelled Successfully', {
        orderId: id,
        reason,
      }, correlationId);

      return cancelledOrder;
    } catch (error) {
      logger.error('Order Cancellation Failed', {
        orderId: id,
        reason,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, correlationId);
      throw error;
    }
  }

  async searchOrders(request: OrderSearchRequest): Promise<OrderSearchResponse> {
    const page = request.pagination?.page || 1;
    const limit = request.pagination?.limit || 20;
    const offset = (page - 1) * limit;

    const result = await this.orderRepository.find(
      request.filters,
      {
        limit,
        offset,
        sortBy: request.sorting?.field,
        sortOrder: request.sorting?.order,
      }
    );

    // Calculate summary statistics
    const totalRevenue = result.orders.reduce((sum, order) => sum + order.totalAmount.amount, 0);
    const averageOrderValue = result.total > 0 ? totalRevenue / result.total : 0;

    return {
      orders: result.orders,
      pagination: {
        current: page,
        total: Math.ceil(result.total / limit),
        hasNext: offset + limit < result.total,
        hasPrev: page > 1,
      },
      summary: {
        totalOrders: result.total,
        totalRevenue,
        averageOrderValue,
      },
    };
  }

  async getCustomerOrders(customerId: string, options?: {
    status?: string[];
    page?: number;
    limit?: number;
  }): Promise<OrderSearchResponse> {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const offset = (page - 1) * limit;

    const result = await this.orderRepository.findByCustomerId(customerId, {
      status: options?.status,
      limit,
      offset,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });

    const totalRevenue = result.orders.reduce((sum, order) => sum + order.totalAmount.amount, 0);
    const averageOrderValue = result.total > 0 ? totalRevenue / result.total : 0;

    return {
      orders: result.orders,
      pagination: {
        current: page,
        total: Math.ceil(result.total / limit),
        hasNext: offset + limit < result.total,
        hasPrev: page > 1,
      },
      summary: {
        totalOrders: result.total,
        totalRevenue,
        averageOrderValue,
      },
    };
  }

  async getOrderStatistics(startDate: Date, endDate: Date): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
    currency: string;
    topDevices: Array<{
      deviceId: string;
      deviceName: string;
      totalQuantity: number;
      totalRevenue: number;
    }>;
  }> {
    const [statistics, topDevices] = await Promise.all([
      this.orderRepository.getStatistics(startDate, endDate),
      this.orderRepository.getTopSellingDevices(startDate, endDate, 10),
    ]);

    return {
      ...statistics,
      topDevices,
    };
  }

  private async validateCreateOrderData(orderData: CreateOrderData): Promise<void> {
    if (!orderData.customerId?.trim()) {
      throw new ValidationError('Customer ID is required');
    }

    if (!orderData.items || orderData.items.length === 0) {
      throw new ValidationError('Order must contain at least one item');
    }

    if (!orderData.shippingAddress) {
      throw new ValidationError('Shipping address is required');
    }

    // Validate shipping address
    const address = orderData.shippingAddress;
    if (!address.name?.trim()) {
      throw new ValidationError('Shipping address name is required');
    }
    if (!address.street?.trim()) {
      throw new ValidationError('Shipping address street is required');
    }
    if (!address.city?.trim()) {
      throw new ValidationError('Shipping address city is required');
    }
    if (!address.country?.trim()) {
      throw new ValidationError('Shipping address country is required');
    }

    // Validate items
    for (const item of orderData.items) {
      if (!item.deviceId?.trim()) {
        throw new ValidationError('Device ID is required for all items');
      }
      if (item.quantity <= 0) {
        throw new ValidationError('Item quantity must be positive');
      }
      if (item.unitPrice.amount <= 0) {
        throw new ValidationError('Item price must be positive');
      }
      if (item.unitPrice.currency !== config.getDefaultCurrency()) {
        throw new ValidationError(`Item currency must be ${config.getDefaultCurrency()}`);
      }
    }
  }

  private validateStatusTransition(currentStatus: string, newStatus: string): void {
    const validTransitions: Record<string, string[]> = {
      'PENDING': ['CONFIRMED', 'CANCELLED'],
      'CONFIRMED': ['PROCESSING', 'CANCELLED'],
      'PROCESSING': ['SHIPPED', 'CANCELLED'],
      'SHIPPED': ['DELIVERED'],
      'DELIVERED': ['REFUNDED'],
      'CANCELLED': [],
      'REFUNDED': [],
    };

    const allowedNextStatuses = validTransitions[currentStatus] || [];
    if (!allowedNextStatuses.includes(newStatus)) {
      throw new BusinessRuleViolationError(
        'INVALID_STATUS_TRANSITION',
        `Cannot transition from ${currentStatus} to ${newStatus}`
      );
    }
  }

  private generateCorrelationId(): string {
    return `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
