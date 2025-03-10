import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig = {
  distDir: 'build',
  output: 'export' as const,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    // Apply for both client and server bundles
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...(config.resolve?.fallback || {}),
        punycode: false,
      },
    };
    return config;
  },
};

export default nextConfig; 