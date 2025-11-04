/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

// Create the configuration for the bundle analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Enable if ANALYZE is true
});

const nextConfig = {
  // Environment variables accessible in the browser

  env: {
    API_URL: process.env.API_URL,
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd279et700s7bw3.cloudfront.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'd34tm8zuk6s623.cloudfront.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'd10l53fpfhdeev.cloudfront.net',
        pathname: '**',
      },
      { protocol: 'https', hostname: 'pbs.twimg.com', pathname: '**' },
      { protocol: 'https', hostname: 'abs.twimg.com', pathname: '**' },
    ],
  },
  // Static page generation timeout
  staticPageGenerationTimeout: 600,
  // React strict mode
  reactStrictMode: process.env.NODE_ENV === 'development',
};

export default withBundleAnalyzer(nextConfig);
