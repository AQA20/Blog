/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd279et700s7bw3.cloudfront.net',
        pathname: '**',
      },
    ],
  },
  staticPageGenerationTimeout: 180,
};

export default nextConfig;
