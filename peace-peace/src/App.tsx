import "./App.css";
import { dAppClientTezos } from "./helpers/constants";
import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import { Home, Book, Verify, Tickets, Admin, Market } from "./pages";
import { Toaster } from "react-hot-toast";

interface walletList {
  tezos: string;
}

interface refreshList {
  tezos: Date;
}

function App() {
  const [activeAddress, setActiveAddress] = useState<walletList>({
    tezos: "",
  });
  const [refreshedAt, setRefreshedAt] = useState<refreshList>({
    tezos: new Date(),
  });
  const onConnectWallet = async (walletType: "tezos") => {
    if (activeAddress[walletType]) alert(activeAddress);
    else {
      const dAppClient =
        walletType == "tezos" ? dAppClientTezos : dAppClientTezos;
      await dAppClient.requestPermissions();
      const result = await dAppClient.getActiveAccount();
      const tempaddr = activeAddress;
      tempaddr[walletType] = result?.address || "";
      setActiveAddress(tempaddr);
      return result?.address || "";
    }
  };

  const onDisconnectWallet = async (walletType: "tezos") => {
    const dAppClient =
      walletType == "tezos" ? dAppClientTezos : dAppClientTezos;
    await dAppClient.disconnect();
    setRefreshedAt((prevRefreshedAt) => ({
      ...prevRefreshedAt,
      walletType: new Date(),
    }));
    return "";
  };

  useEffect(() => {
    const getActiveAccounts = async () => {
      const _activeAddressTezos = await dAppClientTezos.getActiveAccount();

      setActiveAddress({
        tezos: _activeAddressTezos?.address || "",
      });
    };
    getActiveAccounts();
  }, [refreshedAt]);

  const walletProp: walletInterfaceProps = {
    walletType: "tezos",
    wallets: activeAddress,
    connect: onConnectWallet,
    disconnect: onDisconnectWallet,
    dAppclient: dAppClientTezos,
  };
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home wallet={walletProp} />} />
        <Route path="/book" element={<Book wallet={walletProp} />} />
        <Route path="/tickets" element={<Tickets wallet={walletProp} />} />
        <Route path="/verify" element={<Verify wallet={walletProp} />} />
        <Route path="/admin" element={<Admin wallet={walletProp} />} />
        <Route path="/market" element={<Market wallet={walletProp} />} />
      </Routes>
    </>
  );
}

export default App;
