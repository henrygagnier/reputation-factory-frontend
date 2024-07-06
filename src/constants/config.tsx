"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { optimism, optimismSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { reputationFactoryABI } from "@/abis/reputationFactory";


export const chainDetails = [
  { name: "OP Mainnet", chainId: 10, logo: "/optimism.png" },
  { name: "OP Sepolia", chainId: 11155420, logo: "/optimism.png" },
]

export const defaultChain = chainDetails[0];

export const nullAddress = "0x0000000000000000000000000000000000000000" as `0x${string}`;

interface Contract {
  address: `0x${string}`;
  abi: readonly any[];
}

interface FactoryContract {
  [chainId: number]: Contract;
}

export const factoryContract: FactoryContract = {
  11155420: {
    address: "0x7fCd9e7067E11E5e670122A6891563a1b5905d0A" as `0x${string}`,
    abi: reputationFactoryABI
  },
  10: {
    address: "0x11846BB3168670e7d736c6B9a3992A4B16541C27" as `0x${string}`,
    abi: reputationFactoryABI
  }
};

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
    <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_CLIENT}>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{props.children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    </ThirdwebProvider>
  );
};