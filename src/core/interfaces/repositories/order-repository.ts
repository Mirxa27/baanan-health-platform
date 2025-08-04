import { Order } from '../../domain/entities/order';

export interface CreateOrderData {
  customerId: string;
  items: Array<{
    deviceId: string;
    deviceName: string;
    quantity: number;
    unitPrice: {
      amount: number;
      currency: string;
    };
  }>;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  taxRate?: number;
}

export interface UpdateOrderData {
  status?: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  trackingNumber?: string;
  notes?: string;
}

export interface OrderFilters {
  customerId?: string;
  status?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
}

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
      status?: string[];
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
   * Find orders with optional filtering and pagination
   */
  find(
    filters?: OrderFilters,
    options?: {
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
    status: string,
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
      status?: string[];
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
   * Create a new order
   */
  create(orderData: CreateOrderData): Promise<Order>;

  /**
   * Update an existing order
   */
  update(id: string, updateData: UpdateOrderData): Promise<Order>;

  /**
   * Save an order (create or update)
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
