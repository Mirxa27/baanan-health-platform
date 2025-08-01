import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization settings
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Asset optimization
  compress: true,
  poweredByHeader: false,

  // Environment-specific configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Development server configuration (only in dev)
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: [
      '28c2165d32924a4d8a1994857b7d22f9-4d76a73f8eb54783b9701cbd3.fly.dev',
      'localhost:3000',
      '0.0.0.0:3000'
    ],
  }),

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Fix HMR in deployment environments
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
      };
    }

    return config;
  },

  // Headers configuration
  async headers() {
    const headers = [];

    // Development CORS headers
    if (process.env.NODE_ENV === 'development') {
      headers.push({
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      });
    }

    // Security headers for production
    if (process.env.NODE_ENV === 'production') {
      headers.push({
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      });
    }

    return headers;
  },

  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/halol/auth/signin',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/halol/auth/signup',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
