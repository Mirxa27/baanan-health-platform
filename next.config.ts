import type { NextConfig } from "next";
import nextTranslate from 'next-translate-plugin';

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

export default nextTranslate(nextConfig);
