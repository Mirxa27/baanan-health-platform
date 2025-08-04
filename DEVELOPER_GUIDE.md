# 👨‍💻 Developer Guide - Baanan Healthcare Platform

## Welcome to Baanan! 🏥

This guide will help you get up and running with the Baanan Healthcare Platform development environment and understand our development practices.

## Table of Contents
- [Quick Start](#quick-start)
- [Development Environment](#development-environment)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing Guidelines](#testing-guidelines)
- [API Development](#api-development)
- [Frontend Development](#frontend-development)
- [Database Management](#database-management)
- [Deployment Process](#deployment-process)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Prerequisites
- Node.js 18+ (recommend using nvm)
- npm or yarn
- Git
- PostgreSQL (for local development)
- VS Code (recommended) with extensions

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/baanan/healthcare-platform.git
cd healthcare-platform

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate:dev

# Seed development data
npm run db:seed

# Start development server
npm run dev
```

### 2. Verify Installation
```bash
# Run tests
npm test

# Check types
npm run type-check

# Check linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Environment

### Required Tools
- **Node.js 18+** - JavaScript runtime
- **npm/yarn** - Package manager
- **Git** - Version control
- **PostgreSQL** - Database (local or cloud)

### Recommended Tools
- **VS Code** - Code editor
- **Docker** - Containerization (optional)
- **Postman/Insomnia** - API testing
- **TablePlus/pgAdmin** - Database management

### VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

### Environment Variables
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/baanan_dev"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-development-secret-key"

# External Services (Development)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_NOTIFICATIONS=true
LOG_LEVEL=debug
```

## Project Structure

```
baanan-healthcare-platform/
├── src/                          # New clean architecture
│   ├── core/                     # Business logic
│   │   ├── domain/               # Entities, value objects
│   │   ├── application/          # Use cases, services
│   │   └── interfaces/           # Contracts
│   ├── infrastructure/           # External concerns
│   │   ├── database/             # Repositories
│   │   ├── external/             # APIs, services
│   │   └── config/               # Configuration
│   └── shared/                   # Utilities
│       ├── errors/               # Error handling
│       ├── logging/              # Structured logging
│       └── validation/           # Input validation
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   ├── components/               # UI components
│   └── (pages)/                  # Page components
├── components/                   # Shared components
├── lib/                          # Legacy utilities
├── tests/                        # Test files
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   └── e2e/                      # End-to-end tests
├── prisma/                       # Database schema
├── locales/                      # Internationalization
└── public/                       # Static assets
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/device-search-enhancement

# Implement feature with tests
# Commit changes with conventional commits
git commit -m "feat: add advanced device search filters"

# Push and create PR
git push origin feature/device-search-enhancement
```

### 2. Code Quality Checks
```bash
# Before committing
npm run lint:fix          # Fix linting issues
npm run format           # Format code
npm run type-check       # Check TypeScript types
npm test                 # Run tests
```

### 3. Pre-commit Hooks
We use Husky for pre-commit hooks:
```bash
# Automatically runs on git commit
- ESLint checks
- Prettier formatting
- Type checking
- Unit tests
```

### 4. Pull Request Process
1. **Create descriptive PR title** using conventional commits
2. **Fill PR template** with description and checklist
3. **Ensure CI passes** (tests, linting, type checking)
4. **Request code review** from team members
5. **Address feedback** and update PR
6. **Merge** after approval

## Testing Guidelines

### Testing Philosophy
- **Test behavior, not implementation**
- **Focus on business logic**
- **Maintain test pyramid ratio** (70% unit, 20% integration, 10% e2e)
- **Write tests first** for critical business logic

### Unit Tests
```typescript
// src/core/domain/entities/__tests__/device.test.ts
describe('Device Entity', () => {
  it('should reserve stock successfully', () => {
    const device = DeviceFactory.create({ stock: { quantity: 10, reserved: 0 } });
    
    device.reserveStock(5);
    
    expect(device.availableStock()).toBe(5);
    expect(device.stock.reserved).toBe(5);
  });
});
```

### Integration Tests
```typescript
// tests/integration/api/devices.test.ts
describe('GET /api/v2/devices', () => {
  it('should return paginated devices', async () => {
    const response = await request(app)
      .get('/api/v2/devices?page=1&limit=10')
      .expect(200);
    
    expect(response.body.data.devices).toHaveLength(10);
    expect(response.body.data.pagination.current).toBe(1);
  });
});
```

### E2E Tests
```typescript
// tests/e2e/device-management.spec.ts
test('admin can create new device', async ({ page }) => {
  await page.goto('/halol/dashboard');
  await page.click('[data-testid=add-device-button]');
  await page.fill('[data-testid=device-name]', 'New MRI Scanner');
  await page.click('[data-testid=save-device]');
  
  await expect(page.locator('[data-testid=success-message]')).toBeVisible();
});
```

### Running Tests
```bash
# Unit tests
npm run test:unit

# Integration tests  
npm run test:integration

# E2E tests
npm run test:e2e

# All tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## API Development

### 1. Creating New API Endpoints

#### Step 1: Define Domain Entity
```typescript
// src/core/domain/entities/rental.ts
export class Rental {
  constructor(private props: RentalProps) {
    this.validateBusinessRules();
  }
  
  start(): void {
    // Business logic
  }
}
```

#### Step 2: Create Repository Interface
```typescript
// src/core/interfaces/repositories/rental-repository.ts
export interface RentalRepository {
  findById(id: string): Promise<Rental | null>;
  save(rental: Rental): Promise<Rental>;
}
```

#### Step 3: Implement Application Service
```typescript
// src/core/application/services/rental-application-service.ts
export class RentalApplicationService {
  constructor(private rentalRepository: RentalRepository) {}
  
  async createRental(request: CreateRentalRequest): Promise<Rental> {
    // Implementation
  }
}
```

#### Step 4: Create API Route
```typescript
// app/api/v2/rentals/route.ts
export const POST = withAuth(
  withValidation(
    CreateRentalSchema,
    async (request, context, data) => {
      const rentalService = getRentalService();
      const rental = await rentalService.createRental(data);
      
      return createApiResponse(rental, {
        status: 201,
        correlationId: context.correlationId,
      });
    }
  ),
  { requireRole: 'CUSTOMER' }
);
```

### 2. API Design Patterns

#### Request Validation
```typescript
const CreateDeviceSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.object({
    amount: z.number().positive(),
    currency: z.string().length(3),
  }),
});
```

#### Error Handling
```typescript
try {
  const device = await deviceService.createDevice(data);
  return createApiResponse(device, { status: 201 });
} catch (error) {
  if (error instanceof ValidationError) {
    return handleApiError(error, context.correlationId);
  }
  throw error; // Let middleware handle
}
```

#### Response Format
```typescript
// Success
{
  "success": true,
  "data": { ... },
  "message": "Device created successfully",
  "correlationId": "req-123",
  "timestamp": "2024-01-15T10:30:00Z"
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "timestamp": "2024-01-15T10:30:00Z",
    "correlationId": "req-123"
  }
}
```

## Frontend Development

### 1. Component Development

#### Component Structure
```typescript
// app/components/DeviceCard.tsx
interface DeviceCardProps {
  device: Device;
  onSelect: (device: Device) => void;
}

export function DeviceCard({ device, onSelect }: DeviceCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold">{device.name}</h3>
      <p className="text-gray-600">{device.description}</p>
      <button 
        onClick={() => onSelect(device)}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Select Device
      </button>
    </div>
  );
}
```

#### State Management
```typescript
// Use React hooks for local state
const [devices, setDevices] = useState<Device[]>([]);
const [loading, setLoading] = useState(true);

// Use custom hooks for complex logic
const { devices, loading, error, refetch } = useDevices({
  category: selectedCategory,
  page: currentPage,
});
```

#### Form Handling
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm<CreateDeviceData>({
  resolver: zodResolver(CreateDeviceSchema),
  defaultValues: {
    name: '',
    category: 'MONITORING',
  },
});
```

### 2. Styling Guidelines

#### Tailwind CSS Classes
```typescript
// Use semantic class combinations
const buttonStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

#### Component Variants
```typescript
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  const baseClasses = 'font-medium rounded-lg transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Database Management

### 1. Schema Changes

#### Creating Migrations
```bash
# Add new field to existing model
npx prisma migrate dev --name add_device_specifications

# Create new model
npx prisma migrate dev --name create_rental_model
```

#### Schema Best Practices
```prisma
model Device {
  id          String   @id @default(cuid())
  name        String   @db.VarChar(255)
  price       Decimal  @db.Decimal(10, 2)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Indexes for performance
  @@index([category, isAvailable])
  @@index([createdAt])
  
  @@map("devices")
}
```

### 2. Data Seeding
```typescript
// prisma/seed.ts
async function main() {
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@baanan.com',
      name: 'Admin User',
      role: 'ADMIN',
      password: await bcrypt.hash('admin123', 12),
    },
  });

  const devices = await Promise.all([
    prisma.device.create({
      data: {
        name: 'MRI Scanner',
        category: 'IMAGING',
        // ... other fields
      },
    }),
    // More devices...
  ]);
}
```

### 3. Query Optimization
```typescript
// Use select to limit fields
const devices = await prisma.device.findMany({
  select: {
    id: true,
    name: true,
    price: true,
  },
  where: { isAvailable: true },
  orderBy: { createdAt: 'desc' },
  take: 20,
});

// Use include for related data
const order = await prisma.order.findUnique({
  where: { id: orderId },
  include: {
    orderItems: {
      include: { device: true },
    },
    user: {
      select: { name: true, email: true },
    },
  },
});
```

## Deployment Process

### 1. Development to Staging
```bash
# Merge to develop branch
git checkout develop
git merge feature/your-feature

# Deploy to staging (automatic)
# - GitHub Actions triggers
# - Runs tests
# - Deploys to Vercel staging
```

### 2. Staging to Production
```bash
# Create release PR
git checkout main
git merge develop

# Tag release
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0

# Deploy to production (automatic)
# - GitHub Actions triggers
# - Runs full test suite
# - Deploys to Vercel production
```

### 3. Database Migrations in Production
```bash
# Migrations run automatically during deployment
# via vercel-build script in package.json
"vercel-build": "prisma generate && prisma migrate deploy && npm run build"
```

### 4. Rollback Process
```bash
# Revert to previous deployment
vercel rollback

# Or revert specific commit
git revert <commit-hash>
git push origin main
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues
```bash
# Check DATABASE_URL format
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Test connection
npx prisma db pull

# Reset database
npx prisma migrate reset
```

#### 2. TypeScript Errors
```bash
# Regenerate Prisma client
npx prisma generate

# Clear Next.js cache
rm -rf .next

# Check tsconfig.json paths
```

#### 3. Authentication Issues
```bash
# Check NEXTAUTH_SECRET is set
# Verify NEXTAUTH_URL matches current domain
# Clear browser cookies for development
```

#### 4. Build Failures
```bash
# Check for type errors
npm run type-check

# Check for linting errors
npm run lint

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debugging Tips

#### 1. Logging
```typescript
import { logger } from '@/shared/logging/logger';

// Use structured logging
logger.info('Device created', {
  deviceId: device.id,
  userId: user.id,
});

// Include correlation IDs
logger.error('Payment failed', {
  orderId,
  error: error.message,
}, correlationId);
```

#### 2. Network Debugging
```bash
# Check API endpoints
curl -X GET http://localhost:3000/api/v2/devices

# Check with authentication
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:3000/api/v2/admin/devices
```

#### 3. Database Debugging
```bash
# Open Prisma Studio
npx prisma studio

# Check database directly
psql $DATABASE_URL -c "SELECT * FROM devices LIMIT 5;"
```

### Performance Tips

#### 1. Database Performance
- Use indexes for frequently queried fields
- Limit data with `select` and `take`
- Use `include` instead of separate queries
- Monitor slow queries in production

#### 2. Frontend Performance
- Use Next.js Image component for images
- Implement pagination for large lists
- Use React.memo for expensive components
- Lazy load non-critical components

#### 3. API Performance
- Implement caching for expensive operations
- Use database connection pooling
- Monitor API response times
- Implement rate limiting

---

## Getting Help

### Resources
- **Architecture Documentation**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Documentation**: [API.md](./API.md)
- **Business Logic**: [BUSINESS_LOGIC.md](./BUSINESS_LOGIC.md)

### Team Communication
- **Slack**: #baanan-dev channel
- **Email**: dev-team@baanan.com
- **Issues**: GitHub Issues for bugs and features

### Code Review Guidelines
- Review for business logic correctness
- Check test coverage for new features
- Verify security considerations
- Ensure documentation is updated

---

**Happy Coding! 🚀**

*Last updated: January 15, 2024*
