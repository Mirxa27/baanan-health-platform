# Deployment Guide - Baanan Halol Platform

This guide covers deploying the Baanan Halol Medical Device Management Platform to various environments.

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account
- Environment variables configured

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   ```
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   DATABASE_URL=your-production-database-url
   STRIPE_SECRET_KEY=your-production-stripe-key
   ```

4. **Custom Domain (Optional)**
   - Add your custom domain in Vercel settings
   - Update DNS records as instructed
   - Update NEXTAUTH_URL to your custom domain

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret
      - DATABASE_URL=postgresql://user:password@db:5432/halol
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: halol
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Deploy with Docker
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

## ☁️ AWS Deployment

### Using AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository
   - Choose the main branch

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   Add all required environment variables in Amplify console

### Using AWS ECS

1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name baanan-halol
   ```

2. **Build and Push Image**
   ```bash
   # Build image
   docker build -t baanan-halol .
   
   # Tag for ECR
   docker tag baanan-halol:latest 123456789.dkr.ecr.region.amazonaws.com/baanan-halol:latest
   
   # Push to ECR
   docker push 123456789.dkr.ecr.region.amazonaws.com/baanan-halol:latest
   ```

3. **Create ECS Service**
   - Create ECS cluster
   - Create task definition
   - Create service with load balancer

## 🌐 Traditional VPS Deployment

### Prerequisites
- Ubuntu 20.04+ server
- Node.js 18+
- Nginx
- PM2
- SSL certificate

### Setup Steps

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-org/baanan-halol-platform.git
   cd baanan-halol-platform
   
   # Install dependencies
   npm ci
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "halol-platform" -- start
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL with Let's Encrypt**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx -y
   
   # Get SSL certificate
   sudo certbot --nginx -d your-domain.com
   ```

## 📊 Database Setup

### PostgreSQL (Production)
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Create database and user
sudo -u postgres psql
CREATE DATABASE halol_production;
CREATE USER halol_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE halol_production TO halol_user;
\q

# Update DATABASE_URL
DATABASE_URL="postgresql://halol_user:secure_password@localhost:5432/halol_production"
```

### Database Migration
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Seed database (optional)
npm run db:seed
```

## 🔒 Security Checklist

### Environment Variables
- [ ] All secrets are properly configured
- [ ] NEXTAUTH_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] API keys are production-ready

### SSL/TLS
- [ ] HTTPS is enabled
- [ ] SSL certificate is valid
- [ ] HTTP redirects to HTTPS
- [ ] Security headers are configured

### Database Security
- [ ] Database is not publicly accessible
- [ ] Strong database passwords
- [ ] Regular backups are configured
- [ ] Connection pooling is enabled

### Application Security
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Input validation is implemented
- [ ] Error messages don't leak sensitive info

## 📈 Monitoring & Analytics

### Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs halol-platform

# Restart application
pm2 restart halol-platform
```

### Health Checks
Create a health check endpoint:
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
}
```

### Performance Monitoring
- Set up application performance monitoring (APM)
- Configure error tracking (Sentry)
- Monitor database performance
- Set up uptime monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Clear node_modules
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Database Connection Issues**
   ```bash
   # Test database connection
   npx prisma db pull
   
   # Reset database (development only)
   npx prisma db push --force-reset
   ```

3. **Environment Variable Issues**
   ```bash
   # Check environment variables
   printenv | grep NEXT
   
   # Verify .env file
   cat .env.local
   ```

### Performance Issues
- Enable Next.js analytics
- Monitor Core Web Vitals
- Optimize images and assets
- Enable caching strategies

### Security Issues
- Regular security audits
- Keep dependencies updated
- Monitor for vulnerabilities
- Implement proper logging

## 📞 Support

For deployment support:
- **Email**: devops@baanan.com
- **Documentation**: [Internal Wiki]
- **Emergency**: +966564406725

---

**Deployment Guide v1.0**
*Last updated: [Current Date]*