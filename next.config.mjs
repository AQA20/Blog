/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ['d279et700s7bw3.cloudfront.net'],
  },
};

export default nextConfig;
