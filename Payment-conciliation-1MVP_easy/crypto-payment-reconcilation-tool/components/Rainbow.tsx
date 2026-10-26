'use client';

import React, { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { trustWallet, ledgerWallet, rainbowWallet, binanceWallet,phantomWallet, metaMaskWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { mainnet, sepolia, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID! ; // wallet connect cloud project ID...

// Wagmi & RainbowKit Configuration
const config = getDefaultConfig({
  appName: 'paylume-reconciliation-tool',
  projectId,
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base, zora],
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet,phantomWallet,binanceWallet,rainbowWallet]
    },
    {
      groupName: 'Other Wallets',
      wallets: [trustWallet,ledgerWallet,injectedWallet],
    },
  ],

  ssr: true,
});

export default function Rainbowprovider({children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}