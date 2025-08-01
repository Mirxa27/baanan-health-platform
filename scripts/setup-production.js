#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Setting up production environment...\n');

// Generate secure secrets
function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Create production environment template
const productionEnv = `# Production Environment Variables
# Copy these to your Vercel environment variables dashboard

# Database Configuration
DATABASE_URL=postgresql://username:password@hostname:port/database?sslmode=require

# NextAuth Configuration
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=${generateSecret(32)}

# Application Settings
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_APP_NAME="Halol Platform"

# Payment Processing (Stripe)
STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Security
JWT_SECRET=${generateSecret(32)}

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CHAT_SUPPORT=true
ENABLE_MAINTENANCE_MODE=false

# Generated on: ${new Date().toISOString()}
`;

// Write to file
fs.writeFileSync('.env.production', productionEnv);

console.log('✅ Production environment template created: .env.production');
console.log('📝 Generated secure secrets for NEXTAUTH_SECRET and JWT_SECRET');
console.log('\n📋 Next steps:');
console.log('1. Set up a PostgreSQL database (Neon, Supabase, or PlanetScale)');
console.log('2. Update DATABASE_URL with your connection string');
console.log('3. Update NEXTAUTH_URL and NEXT_PUBLIC_APP_URL with your domain');
console.log('4. Set up Stripe and update the payment keys');
console.log('5. Copy all variables to Vercel environment variables');
console.log('6. Deploy to Vercel');

console.log('\n🔒 Security reminders:');
console.log('- Never commit .env.production to version control');
console.log('- Use strong, unique secrets for production');
console.log('- Enable SSL for database connections');
console.log('- Use production Stripe keys only in production');

console.log('\n🚀 Ready for deployment!');
