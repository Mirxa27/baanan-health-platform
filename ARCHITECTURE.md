# 🏗️ Baanan Healthcare Platform - Architecture Documentation

## Table of Contents
- [Overview](#overview)
- [Architecture Principles](#architecture-principles)
- [System Architecture](#system-architecture)
- [Domain Model](#domain-model)
- [Technology Stack](#technology-stack)
- [API Design](#api-design)
- [Security Architecture](#security-architecture)
- [Data Architecture](#data-architecture)
- [Deployment Architecture](#deployment-architecture)
- [Development Guidelines](#development-guidelines)
- [Testing Strategy](#testing-strategy)

## Overview

The Baanan Healthcare Platform is a comprehensive medical device management system built using **Clean Architecture** principles with **Domain-Driven Design (DDD)**. The platform serves healthcare facilities in the GCC region, providing marketplace, consultation, platform services, and support solutions.

### Key Business Domains
- **Medical Device Marketplace** - Buy/sell/rent medical equipment
- **Healthcare Consulting** - Strategic technology guidance  
- **Platform Services** - AI analytics and telehealth integration
- **Support Services** - Maintenance and import assistance

## Architecture Principles

### 1. **Clean Architecture**
- **Independence**: Business logic independent of frameworks, UI, and external concerns
- **Testability**: Core business logic fully testable without external dependencies
- **Framework Independence**: Can switch UI frameworks, databases, or external services
- **Database Independence**: Business rules not bound to database specifics

### 2. **Domain-Driven Design**
- **Ubiquitous Language**: Consistent terminology across code and business
- **Bounded Contexts**: Clear boundaries between different business domains
- **Aggregates**: Consistency boundaries for business transactions
- **Domain Events**: Communicate changes across bounded contexts

### 3. **SOLID Principles**
- **Single Responsibility**: Each class has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes must be substitutable for base classes
- **Interface Segregation**: Clients depend only on interfaces they use
- **Dependency Inversion**: High-level modules don't depend on low-level modules

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                      │
├─────────────────────────────────────────────────────────────┤
│  Next.js Pages/Components  │  API Routes  │  Admin Dashboard │
└─────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
├─────────────────────────���───────────────────────────────────┤
│  Use Cases  │  Application Services  │  DTOs  │  Validators │
└─────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────┐
│                      Domain Layer                           │
├─────────────────────────────────────────────────────────────┤
│  Entities  │  Value Objects  │  Domain Services  │  Events  │
└─────────────────────────────────────────────────────────────┘
                                    │
┌───────────────────────────────────────────────────────���─────┐
│                   Infrastructure Layer                      │
├─────────────────────────────────────────────────────────────┤
│  Database  │  External APIs  │  File System  │  Messaging  │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
src/
├── core/
│   ├── domain/              # Pure business logic
│   │   ├── entities/        # Domain entities (Device, Order, User)
│   │   ├── value-objects/   # Immutable domain values (Money, Address)
│   │   ├── services/        # Domain services
│   │   └── events/          # Domain events
│   ├── application/         # Use cases and application services
│   │   ├── services/        # Application services
│   │   ├── use-cases/       # Specific business use cases
│   │   └── dtos/            # Data transfer objects
│   └── interfaces/          # Contracts and interfaces
│       ├── repositories/    # Repository interfaces
���       └── services/        # Service interfaces
├── infrastructure/         # External concerns
│   ├── database/           # Database implementations
│   │   ├── repositories/   # Repository implementations
│   │   └── migrations/     # Database migrations
│   ├── external/           # External service integrations
│   │   ├── stripe/         # Payment processing
│   │   ├── email/          # Email services
│   │   └── storage/        # File storage
│   ├── config/             # Configuration management
│   ├── auth/               # Authentication providers
│   └── api/                # API middleware and utilities
└── shared/                 # Shared utilities
    ├── errors/             # Error handling
    ├── logging/            # Structured logging
    ├── validation/         # Input validation
    └── utils/              # Common utilities
```

## Domain Model

### Core Entities

#### 1. **Device** (Medical Device Aggregate Root)
```typescript
class Device {
  // Properties
  - id: DeviceId
  - name: string
  - description: string
  - category: DeviceCategory
  - brand: string
  - model: string
  - price: Money
  - rentPrice: Money
  - stock: Stock
  - isActive: boolean
  
  // Business Methods
  + isAvailableForPurchase(quantity: number): boolean
  + reserveStock(quantity: number): void
  + releaseStock(quantity: number): void
  + updatePrice(newPrice: Money): void
  + activate(): void
  + deactivate(): void
}
```

#### 2. **Order** (Order Aggregate Root)
```typescript
class Order {
  // Properties
  - id: OrderId
  - customerId: UserId
  - items: OrderItem[]
  - status: OrderStatus
  - totalAmount: Money
  - shippingAddress: Address
  
  // Business Methods
  + confirm(paymentId: string): void
  + ship(trackingNumber: string): void
  + cancel(reason?: string): void
  + addItem(item: OrderItem): void
}
```

#### 3. **User** (User Aggregate Root)
```typescript
class User {
  // Properties
  - id: UserId
  - email: Email
  - name: string
  - role: UserRole
  - isActive: boolean
  
  // Business Methods
  + changePassword(newPassword: string): void
  + updateProfile(data: ProfileData): void
  + activate(): void
  + deactivate(): void
}
```

### Value Objects

#### **Money**
```typescript
class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: Currency
  ) {}
  
  add(other: Money): Money
  multiply(factor: number): Money
  equals(other: Money): boolean
}
```

#### **Address**
```typescript
class Address {
  constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly country: string,
    public readonly postalCode: string
  ) {}
}
```

### Domain Services

#### **DevicePricingService**
- Calculates pricing based on market conditions
- Validates pricing rules and business constraints
- Handles bulk pricing and discounts

#### **OrderFulfillmentService**
- Orchestrates order processing workflow
- Manages inventory allocation
- Coordinates with shipping providers

## Technology Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form management
- **Zod** - Runtime type validation

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM and migrations
- **NextAuth.js** - Authentication and session management
- **Stripe** - Payment processing
- **Zod** - Input validation and type safety

### **Database**
- **PostgreSQL** - Primary relational database
- **Prisma** - Database toolkit and ORM
- **Redis** (Future) - Caching and session storage

### **Infrastructure**
- **Vercel** - Deployment and hosting
- **Neon** - Managed PostgreSQL hosting
- **Vercel Analytics** - Performance monitoring
- **Sentry** (Planned) - Error tracking and monitoring

### **Testing**
- **Jest** - Unit and integration testing
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **Mock Service Worker** - API mocking

## API Design

### **RESTful API Principles**
- **Resource-based URLs**: `/api/v2/devices`, `/api/v2/orders`
- **HTTP Methods**: GET, POST, PUT, DELETE for CRUD operations
- **Status Codes**: Proper HTTP status codes for different scenarios
- **Content Negotiation**: JSON for data exchange

### **API Versioning**
```
/api/v1/devices  (Legacy)
/api/v2/devices  (Current)
```

### **Response Format**
```typescript
// Success Response
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully",
  "correlationId": "req-123456789",
  "timestamp": "2024-01-15T10:30:00Z"
}

// Error Response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "timestamp": "2024-01-15T10:30:00Z",
    "correlationId": "req-123456789",
    "details": {...}
  }
}
```

### **Authentication**
```
Authorization: Bearer <jwt_token>
```

### **Request/Response Headers**
```
Content-Type: application/json
Accept: application/json
X-Request-ID: <correlation_id>
X-API-Version: v2
```

## Security Architecture

### **Authentication & Authorization**
- **JWT-based authentication** with NextAuth.js
- **Role-based access control** (ADMIN, CUSTOMER)
- **Session management** with secure HTTP-only cookies
- **Password hashing** with bcrypt (12+ rounds)

### **API Security**
- **Input validation** with Zod schemas
- **Rate limiting** per endpoint and user
- **CORS configuration** for allowed origins
- **SQL injection prevention** with Prisma ORM
- **XSS protection** with Content Security Policy

### **Data Protection**
- **Encryption at rest** for sensitive data
- **TLS 1.3** for data in transit
- **Environment variable** management for secrets
- **Database connection** security with connection pooling

### **Security Headers**
```typescript
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}
```

## Data Architecture

### **Database Design Principles**
- **Normalized schema** for data integrity
- **Foreign key constraints** for referential integrity
- **Indexes** for query performance
- **Audit trails** for data changes
- **Soft deletes** for data retention

### **Entity Relationships**
```
User 1:N Order 1:N OrderItem N:1 Device
User 1:N Rental 1:N RentalItem N:1 Device
User 1:N MaintenanceRequest N:1 Device
User 1:N CustomerServiceChat 1:N Message
```

### **Data Migration Strategy**
- **Versioned migrations** with Prisma
- **Rollback capability** for failed deployments
- **Data seeding** for development and testing
- **Backup strategy** before major migrations

## Deployment Architecture

### **Environments**
- **Development** - Local development with hot reload
- **Staging** - Production-like environment for testing
- **Production** - Live environment with monitoring

### **Deployment Pipeline**
```
Git Push → GitHub Actions → Build → Test → Deploy → Monitor
```

### **Infrastructure as Code**
```typescript
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### **Environment Variables**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Authentication
NEXTAUTH_URL=https://platform.baanan.com
NEXTAUTH_SECRET=super-secure-secret

# External Services
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_NOTIFICATIONS=true
```

## Development Guidelines

### **Code Style**
- **TypeScript** for all new code
- **ESLint** with strict rules
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

### **Commit Convention**
```
feat: add device search functionality
fix: resolve payment processing issue
docs: update API documentation
test: add unit tests for order service
refactor: improve error handling
```

### **Branch Strategy**
```
main → production deployments
develop → integration branch
feature/* → new features
hotfix/* → critical fixes
```

### **Code Review Process**
1. **Create feature branch** from develop
2. **Implement feature** with tests
3. **Create pull request** with description
4. **Code review** by team members
5. **Merge** after approval and passing tests

## Testing Strategy

### **Testing Pyramid**
```
                    E2E Tests (10%)
               ┌─────────────────────┐
               │  Integration (20%)  │
           ┌───┴─────────────────────┴───┐
           │      Unit Tests (70%)       │
           └─────────────────────────────┘
```

### **Unit Tests**
- **Domain entities** business logic
- **Application services** use cases
- **Utility functions** and helpers
- **Value objects** immutability and validation

### **Integration Tests**
- **API endpoints** request/response flow
- **Database operations** data persistence
- **External service** integrations
- **Authentication** flows

### **End-to-End Tests**
- **Critical user journeys** (device purchase, order management)
- **Cross-browser compatibility**
- **Mobile responsiveness**
- **Performance benchmarks**

### **Test Data Management**
- **Test factories** for entity creation
- **Mock repositories** for isolated testing
- **Database seeding** for integration tests
- **Cleanup strategies** after test runs

---

## Architecture Decision Records (ADRs)

### ADR-001: Clean Architecture Implementation
**Status**: Accepted  
**Date**: 2024-01-15

**Context**: Need maintainable, testable codebase for complex healthcare domain.

**Decision**: Implement Clean Architecture with DDD principles.

**Consequences**: 
- ✅ Better separation of concerns
- ✅ Improved testability
- ✅ Framework independence
- ❌ Initial complexity overhead

### ADR-002: Next.js with App Router
**Status**: Accepted  
**Date**: 2024-01-15

**Context**: Need modern React framework with SSR and API capabilities.

**Decision**: Use Next.js 15 with App Router for full-stack development.

**Consequences**:
- ✅ Server-side rendering
- ✅ API routes co-location
- ✅ Built-in optimizations
- ❌ Framework lock-in

### ADR-003: PostgreSQL with Prisma
**Status**: Accepted  
**Date**: 2024-01-15

**Context**: Need reliable database with strong typing and migrations.

**Decision**: Use PostgreSQL with Prisma ORM.

**Consequences**:
- ✅ ACID compliance
- ✅ Type safety
- ✅ Migration management
- ❌ Learning curve for team

---

**Last Updated**: January 15, 2024  
**Version**: 2.0  
**Maintainer**: Baanan Architecture Team
