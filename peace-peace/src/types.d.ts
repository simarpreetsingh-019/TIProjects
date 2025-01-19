interface walletInterfaceProps {
    walletType: "tezos";
    wallets: walletList;
    connect: (walletType: "tezos") => Promise<string | undefined>;
    disconnect: (
      walletType: "tezos"
    ) => Promise<string | undefined>;
    dAppclient: DAppClient
  }