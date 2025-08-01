# Deployment Guide - Halol Medical Platform

## Overview
This guide covers deploying the Halol Medical Platform to Vercel with a PostgreSQL database.

## Prerequisites
- Vercel account
- PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)
- Stripe account for payment processing
- Domain name (optional)

## Database Setup

### Option 1: Neon (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Set it as `DATABASE_URL` in Vercel environment variables

### Option 2: Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Set it as `DATABASE_URL` in Vercel environment variables

### Option 3: PlanetScale
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Create a production branch
4. Copy the connection string
5. Set it as `DATABASE_URL` in Vercel environment variables

## Vercel Deployment

### 1. Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing this code

### 2. Configure Build Settings
- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install`

### 3. Environment Variables
Add these environment variables in Vercel dashboard:

#### Required Variables
```
DATABASE_URL=your_postgresql_connection_string
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secure-random-string-32-chars-min
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME=Halol Platform
NODE_ENV=production
JWT_SECRET=your-jwt-secret-32-chars-min
```

#### Stripe Configuration
```
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
```

#### Optional Variables
```
ENABLE_ANALYTICS=true
ENABLE_CHAT_SUPPORT=true
ENABLE_MAINTENANCE_MODE=false
```

### 4. Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be available at `https://your-app.vercel.app`

## Post-Deployment Setup

### 1. Database Migration
The database schema will be automatically pushed during build. For manual migration:
```bash
npx prisma migrate deploy
```

### 2. Seed Data (Optional)
To add initial data:
```bash
npx prisma db seed
```

### 3. Test Authentication
1. Visit `/halol/auth/signin`
2. Try signing up with a new account
3. Verify email functionality works

### 4. Stripe Webhooks
1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook secret and add to environment variables

## Domain Configuration (Optional)

### 1. Add Custom Domain
1. In Vercel dashboard, go to your project
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 2. Update Environment Variables
Update these variables with your custom domain:
- `NEXTAUTH_URL=https://yourdomain.com`
- `NEXT_PUBLIC_APP_URL=https://yourdomain.com`

## Monitoring and Maintenance

### 1. Error Monitoring
- Check Vercel Functions logs for errors
- Monitor database performance in your database provider
- Set up Vercel Analytics for usage tracking

### 2. Backups
- Enable automated backups in your database provider
- Export important data regularly

### 3. Updates
- Keep dependencies updated
- Monitor security alerts
- Test changes in preview deployments

## Troubleshooting

### Build Failures
- Check environment variables are set correctly
- Verify database connection string format
- Review build logs in Vercel dashboard

### Runtime Errors
- Check Function logs in Vercel
- Verify database connectivity
- Test API endpoints individually

### Authentication Issues
- Verify NEXTAUTH_URL matches your domain
- Check NEXTAUTH_SECRET is set
- Test signin/signup flows

## Support
For deployment issues:
1. Check Vercel documentation
2. Review database provider docs
3. Contact support if needed

## Security Checklist
- [ ] Strong NEXTAUTH_SECRET (32+ characters)
- [ ] Secure JWT_SECRET
- [ ] Production Stripe keys
- [ ] Database connection uses SSL
- [ ] Environment variables secured
- [ ] Custom domain with HTTPS
- [ ] Security headers enabled
