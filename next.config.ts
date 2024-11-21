import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['picsum.photos'],
    formats: ['image/webp', 'image/avif'],
  },
  publicRuntimeConfig: {
    NAVER_CLIENT_ID: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    API_HOST: process.env.NEXT_PUBLIC_API_HOST,
    S3_HOST: process.env.NEXT_PUBLIC_AWS_HOST,
  },
};

export default nextConfig;
