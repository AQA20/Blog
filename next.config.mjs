/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

// Create the configuration for the bundle analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Enable if ANALYZE is true
});

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
  staticPageGenerationTimeout: 300,
  swcMinify: true, // Enables the SWC minifier for faster builds
  reactStrictMode: process.env.NODE_ENV !== 'production',
};

export default withBundleAnalyzer(nextConfig);
