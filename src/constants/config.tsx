"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { optimism, optimismSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";


export const chainDetails = [
  { name: "OP Sepolia", chainId: 11155420, logo: "/optimism.png" },
  { name: "OP Mainnet", chainId: 10, logo: "/optimism.png" },
]

export const defaultChain = chainDetails[0];

export const nullAddress = "0x0000000000000000000000000000000000000000" as `0x${string}`;

export const factoryContract = {
  address: "" as `0x${string}`,
  abi: []
}

export const config = createConfig(
  getDefaultConfig({
    chains: [optimism, optimismSepolia],
    transports: {
      [optimismSepolia.id]: http(),
      [optimism.id]: http(),
    },

    walletConnectProjectId: "1a220f2c3d69be0e73a7d02da48942f5",
    appName: "Reputation Factory",
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = (props: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{props.children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};