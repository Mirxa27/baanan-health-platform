export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'CUSTOMER' | 'ADMIN';
  phone?: string;
  address?: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface CreateUserData {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  password: string;
  role?: 'CUSTOMER' | 'ADMIN';
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  emailVerified?: boolean;
}

export interface UserRepository {
  /**
   * Find a user by their unique identifier
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find a user by email address
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find users with optional filtering and pagination
   */
  find(
    filters?: {
      role?: 'CUSTOMER' | 'ADMIN';
      isActive?: boolean;
      emailVerified?: boolean;
      searchTerm?: string;
    },
    options?: {
      limit?: number;
      offset?: number;
      sortBy?: 'name' | 'email' | 'createdAt' | 'lastLoginAt';
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<{
    users: User[];
    total: number;
  }>;

  /**
   * Create a new user
   */
  create(userData: CreateUserData): Promise<User>;

  /**
   * Update an existing user
   */
  update(id: string, userData: UpdateUserData): Promise<User>;

  /**
   * Update user password
   */
  updatePassword(id: string, hashedPassword: string): Promise<void>;

  /**
   * Delete a user (soft delete recommended)
   */
  delete(id: string): Promise<void>;

  /**
   * Check if a user exists by ID
   */
  exists(id: string): Promise<boolean>;

  /**
   * Check if email is already taken
   */
  emailExists(email: string, excludeId?: string): Promise<boolean>;

  /**
   * Verify user credentials for authentication
   */
  verifyCredentials(email: string, password: string): Promise<User | null>;

  /**
   * Record user login
   */
  recordLogin(id: string): Promise<void>;

  /**
   * Get user statistics
   */
  getStatistics(): Promise<{
    totalUsers: number;
    activeUsers: number;
    customerCount: number;
    adminCount: number;
    recentSignups: number; // Last 30 days
  }>;

  /**
   * Find users who haven't verified their email
   */
  findUnverifiedUsers(olderThanDays?: number): Promise<User[]>;

  /**
   * Find inactive users
   */
  findInactiveUsers(olderThanDays?: number): Promise<User[]>;
}
