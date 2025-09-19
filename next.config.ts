import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['hardhat'],
  images: {
    domains: ['gateway.pinata.cloud'],
  },
  env: {
    NEXT_PUBLIC_PINATA_API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY,
    NEXT_PUBLIC_PINATA_SECRET_KEY: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
