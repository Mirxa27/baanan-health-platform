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
};

export default nextConfig;
