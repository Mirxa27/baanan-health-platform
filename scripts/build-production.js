#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Building for production...\n');

try {
  // Copy production schema if in production environment
  if (process.env.NODE_ENV === 'production') {
    console.log('📝 Using production PostgreSQL schema...');
    
    if (fs.existsSync('prisma/schema.production.prisma')) {
      // Backup current schema
      fs.copyFileSync('prisma/schema.prisma', 'prisma/schema.backup.prisma');
      
      // Use production schema
      fs.copyFileSync('prisma/schema.production.prisma', 'prisma/schema.prisma');
      
      console.log('✅ Production schema activated');
    }
  }

  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Push database schema (for new databases)
  if (process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
    console.log('🗄️  Setting up database schema...');
    
    try {
      execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
      console.log('✅ Database schema setup complete');
    } catch (error) {
      console.log('⚠️  Database schema push failed, trying migration...');
      try {
        execSync('npx prisma migrate deploy', { stdio: 'inherit' });
        console.log('✅ Database migration complete');
      } catch (migrationError) {
        console.log('⚠️  Migration failed, continuing build...');
      }
    }
  }

  // Build Next.js app
  console.log('🏗️  Building Next.js application...');
  execSync('next build', { stdio: 'inherit' });

  console.log('✅ Production build complete!');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Restore original schema if we changed it
  if (process.env.NODE_ENV === 'production' && fs.existsSync('prisma/schema.backup.prisma')) {
    fs.copyFileSync('prisma/schema.backup.prisma', 'prisma/schema.prisma');
    fs.unlinkSync('prisma/schema.backup.prisma');
    console.log('🔄 Development schema restored');
  }
}
