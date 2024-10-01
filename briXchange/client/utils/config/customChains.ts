import { type Chain } from "viem";

export const core: Chain = {
  id: 1115,
  name: "CORE",
  nativeCurrency: {
    decimals: 18,
    name: "tCORE",
    symbol: "TCORE",
  },
  rpcUrls: {
    default: { http: ["https://rpc.test.btcs.network"] },
  },
  blockExplorers: {
    default: { name: "Core Explorer", url: "https://scan.test.btcs.network/" },
  },
  testnet: true,
};