'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi-config';
import { Web3Provider } from '@/contexts/Web3Context';
import { ThemeProvider } from '@/contexts/ThemeContext';

const queryClient = new QueryClient();

interface Web3ProvidersProps {
  children: React.ReactNode;
}

export default function Web3Providers({ children }: Web3ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <ThemeProvider>
            <Web3Provider>
              {children}
            </Web3Provider>
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
