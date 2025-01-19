// import { BeaconWallet } from "@taquito/beacon-wallet";
// import { ColorMode, Network, NetworkType } from "@airgap/beacon-sdk";

// export const TEZOS_COLLECT_NETWORK: Network = {
//   type:
//     // process.env.NODE_ENV === "development"
//     // ? NetworkType.GHOSTNET:
//     NetworkType.MAINNET,
// };
// export const TEZOS_COLLECT_WALLET = new BeaconWallet({
//   name: "Tezos Collect",
//   preferredNetwork: TEZOS_COLLECT_NETWORK.type,
//   colorMode: ColorMode.DARK,
// });

import { DAppClient, NetworkType } from "@airgap/beacon-sdk";

export const dAppClientTezos = new DAppClient({ name: "Tezos", preferredNetwork: NetworkType.GHOSTNET });
// export const dAppClientEtherlink = new DAppClient({ name: "Etherlink" });

