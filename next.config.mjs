/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEV_API_URL: process.env.DEV_API_URL,
    PROD_API_URL: process.env.PROD_API_URL,
  },
  images: {
    domains: ['d1loxlb2lhlbxb.cloudfront.net'],
  },
};

export default nextConfig;
