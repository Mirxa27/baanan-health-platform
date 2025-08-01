#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏥 Setting up Halol Medical Device Management System...\n');

// Check if required files exist
const requiredFiles = [
  'prisma/schema.prisma',
  '.env.local',
  'package.json'
];

console.log('📋 Checking required files...');
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
  console.log(`✅ Found ${file}`);
}

// Check environment variables
console.log('\n🔧 Checking environment variables...');
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!envContent.includes(envVar)) {
    console.warn(`⚠️  Missing environment variable: ${envVar}`);
  } else {
    console.log(`✅ Found ${envVar}`);
  }
}

try {
  console.log('\n📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('\n🗄️  Setting up database...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  execSync('npx prisma db push', { stdio: 'inherit' });

  console.log('\n🌱 Seeding database with sample data...');
  execSync('npm run db:seed', { stdio: 'inherit' });

  console.log('\n✅ Setup completed successfully!');
  console.log('\n🚀 You can now start the development server with:');
  console.log('   npm run dev');
  console.log('\n📱 Access the Halol app at:');
  console.log('   http://localhost:3000/halol');
  console.log('\n👤 Default login credentials:');
  console.log('   Admin: admin@halol.com / admin123');
  console.log('   Customer: customer@example.com / customer123');
  console.log('\n💳 Don\'t forget to configure your Stripe webhook:');
  console.log('   stripe listen --forward-to localhost:3000/api/webhooks/stripe');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
}