import { Order, OrderStatus } from '../../domain/entities/order';

export interface OrderRepository {
  /**
   * Find an order by its unique identifier
   */
  findById(id: string): Promise<Order | null>;

  /**
   * Find orders by customer ID
   */
  findByCustomerId(
    customerId: string,
    options?: {
      status?: OrderStatus['_type'];
      limit?: number;
      offset?: number;
      sortBy?: 'createdAt' | 'totalAmount' | 'status';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<{
    orders: Order[];
    total: number;
  }>;

  /**
   * Find orders by status
   */
  findByStatus(
    status: OrderStatus['_type'],
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<{
    orders: Order[];
    total: number;
  }>;

  /**
   * Find orders within a date range
   */
  findByDateRange(
    startDate: Date,
    endDate: Date,
    options?: {
      status?: OrderStatus['_type'];
      customerId?: string;
      limit?: number;
      offset?: number;
    }
  ): Promise<{
    orders: Order[];
    total: number;
  }>;

  /**
   * Find order by payment ID
   */
  findByPaymentId(paymentId: string): Promise<Order | null>;

  /**
   * Find order by tracking number
   */
  findByTrackingNumber(trackingNumber: string): Promise<Order | null>;

  /**
   * Save a new order or update an existing one
   */
  save(order: Order): Promise<Order>;

  /**
   * Delete an order (soft delete recommended)
   */
  delete(id: string): Promise<void>;

  /**
   * Check if an order exists
   */
  exists(id: string): Promise<boolean>;

  /**
   * Get order statistics for a time period
   */
  getStatistics(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
    currency: string;
  }>;

  /**
   * Get top-selling devices from orders
   */
  getTopSellingDevices(
    startDate: Date,
    endDate: Date,
    limit?: number
  ): Promise<Array<{
    deviceId: string;
    deviceName: string;
    totalQuantity: number;
    totalRevenue: number;
  }>>;

  /**
   * Get customer order summary
   */
  getCustomerSummary(customerId: string): Promise<{
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    currency: string;
    lastOrderDate?: Date;
  }>;

  /**
   * Find orders requiring attention (stuck in processing, etc.)
   */
  findOrdersRequiringAttention(): Promise<Order[]>;
}
