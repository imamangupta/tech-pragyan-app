import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,  // Disable fs module usage
    };
    return config;
  },
};

export default nextConfig;
