'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { localhost } from 'wagmi/chains';
import { http } from 'wagmi';
import { localhostNetwork, yellowNetwork } from './web3';

// Wagmi configuration for client-side use
export const config = getDefaultConfig({
  appName: 'Web3Job Network',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
  chains: [localhostNetwork, yellowNetwork], // localhost first for testing
  ssr: true,
  transports: {
    [localhostNetwork.id]: http(),
    [yellowNetwork.id]: http(),
  },
});
