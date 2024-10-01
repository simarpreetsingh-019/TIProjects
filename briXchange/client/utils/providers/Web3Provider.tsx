import React, { ReactNode } from "react";
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';
import { config,queryClient } from "../config/createConfig";
import { ConnectKitProvider } from 'connectkit';

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export const Web3Provider = ({ children, ...props }: Props) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider {...props} theme="retro">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};