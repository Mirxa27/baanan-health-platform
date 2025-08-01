import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization settings
  images: {
    unoptimized: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Asset optimization
  compress: true,

  // Development server configuration
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',

  // Configure allowed dev origins for HMR
  allowedDevOrigins: [
    '28c2165d32924a4d8a1994857b7d22f9-4d76a73f8eb54783b9701cbd3.fly.dev',
    'localhost:3000',
    '0.0.0.0:3000'
  ],

  // Webpack configuration for HMR
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Fix HMR in deployment environments
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },

  // Experimental features for better HMR
  experimental: {
    // Enable better Fast Refresh
    esmExternals: 'loose',
  },
};

export default nextConfig;
