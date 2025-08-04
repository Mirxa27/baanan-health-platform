// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Global test configuration
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.LOG_LEVEL = 'error'; // Reduce logging during tests

// Mock external services by default
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

// Global test timeout
jest.setTimeout(10000);

// Global afterAll cleanup
afterAll(async () => {
  // Clean up any resources, database connections, etc.
  const { container } = require('./src/infrastructure/di/container');
  await container.cleanup();
});
