import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.vercel-storage.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**.railway.app' },
      { protocol: 'https', hostname: '**.r2.dev' },
    ],
  },
};

export default withPayload(nextConfig);
