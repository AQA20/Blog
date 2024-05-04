/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEV_API_URL: process.env.DEV_API_URL,
    PROD_API_URL: process.env.PROD_API_URL,
  },
  images: {
    domains: ['500-words.s3.me-central-1.amazonaws.com'],
  },
};

export default nextConfig;
