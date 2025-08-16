
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@coinbase/onchainkit']
  }
};

export default nextConfig;
