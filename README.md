# Baanan Health Platform

A modern health platform built with Next.js, featuring the Halol app and comprehensive health services.

## Features

- Modern, responsive design
- Multi-language support (English/Arabic)
- Interactive health services showcase
- Halol app integration
- Contact and consultation booking

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel:**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Or deploy via GitHub:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository: `Mirxa27/baanan-health-platform`
   - Vercel will automatically detect Next.js and configure the build settings

3. **Environment Variables:**
   - No environment variables required for basic deployment
   - Add any API keys or external service credentials in Vercel dashboard if needed

### Manual Deployment Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Test production build locally:**
   ```bash
   npm start
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

## Project Structure

```
├── app/                 # Next.js 13+ app directory
├── components/          # Reusable components
├── public/             # Static assets (including logo)
├── vercel.json         # Vercel configuration
└── package.json        # Dependencies and scripts
```

## Technologies Used

- Next.js 15.3.2
- React 19
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Google Maps API integration

## Repository

GitHub: https://github.com/Mirxa27/baanan-health-platform