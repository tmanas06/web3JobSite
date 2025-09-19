'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, localhost } from 'wagmi/chains';
import { http } from 'wagmi';
import { localhostNetwork } from './web3';

// Wagmi configuration for client-side use
export const config = getDefaultConfig({
  appName: 'Web3Job Network',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
  chains: [sepolia, localhostNetwork], // Sepolia testnet for production
  ssr: true,
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL),
    [localhostNetwork.id]: http(),
  },
});
