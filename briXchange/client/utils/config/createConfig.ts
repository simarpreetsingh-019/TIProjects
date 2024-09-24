import {createConfig, http } from "wagmi";
import { core } from "./customChains";
import { sepolia} from "wagmi/chains";
import { QueryClient} from "@tanstack/react-query";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [sepolia,core],
    transports: {
      [sepolia.id]:http(),
      [core.id]: http(),
    },
    
    walletConnectProjectId: 'a9fdc841635ffa2c5fe7d18174a050b7',
    // Required App Info
    appName: "ShareBlock",
  }),
);

export const queryClient = new QueryClient();