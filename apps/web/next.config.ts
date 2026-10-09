import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@portfolio/ui', '@portfolio/contracts'],
};

export default nextConfig;
