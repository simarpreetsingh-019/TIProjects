import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TezosToolkit } from "@taquito/taquito";
import UploadPage from "./pages/uploadSongs";
import SearchPage from "./pages/searchSongs";
import ExplorePage from "./pages/exploreSongs";
import BuyPage from "./pages/buySongs";
import TezTunesHome from "./pages/home";
import DashboardPage from "./pages/dashboardPage";
import { CONTRACT_ADDRESS, RPC_URL } from "./helpers/contansts";
import { TempleWallet } from "@temple-wallet/dapp";
import { connectWallet } from "./redux/store/wallet";
import { setTezos } from "./redux/store/tezos";
import { gotSongs } from "./redux/store/songs";
import "./App.css";
import LoadingScreen from "./components/loadingScreen";

function App() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const [loading, setLoading] = useState(false);

  async function autoConnect() {
    const tezos = new TezosToolkit(RPC_URL);

    try {
      const available = await TempleWallet.isAvailable();
      if (!available) {
        alert("Temple Wallet is not available");
        return;
      }

      const wallet = new TempleWallet("TezTunes");
      await wallet.connect({ name: "Tezos", rpc: RPC_URL });
      const address = await wallet.getPKH();
      tezos.setWalletProvider(wallet);
      const balanceInMutez = await tezos.tz.getBalance(address);
      dispatch(
        connectWallet({
          address,
          wallet,
          balance: balanceInMutez.toNumber() / 1_000_000,
        })
      );

      // loading songs data
      const contract = await tezos.wallet.at(CONTRACT_ADDRESS);
      const storage = await contract.storage();

      const songsBigMap = storage.songs;
      const counter = storage.counter.toNumber();
      const songs = [];
      for (let i = 0; i < counter; i++) {
        const songData = await songsBigMap.get(i);
        if (songData) {
          const song = {
            artist: songData.artist,
            artist_name: songData.artist_name,
            genre: songData.genre,
            image: songData.image,
            ipfs_hash: songData.ipfs_hash,
            price: songData.price,
            title: songData.title,
          };
          songs.push(song);
        }
      }

      dispatch(gotSongs(songs));

      dispatch(setTezos(tezos));
      setLoading(false);
    } catch (error) {
      console.error(
        "Error connecting Temple Wallet or fetching balance:",
        error
      );
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem("isWalletAvailable") === "true") {
      autoConnect();
    } else {
      setLoading(false);
    }
  }, []);
  if (loading) return <LoadingScreen text={"Loading...."} />;
  return (
    <Router>
      <Routes>
        {wallet?.connected ? (
          <>
            {/* <Navbar /> */}
            <Route path="/" element={<DashboardPage />} />
            <Route
              path="/upload"
              element={
                <>
                  {/* <Navbar /> */}
                  <UploadPage />
                </>
              }
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/buy/:id" element={<BuyPage />} />
            <Route path={"/*"} element={<div>404 page not found</div>} />
          </>
        ) : (
          <>
            <Route path="/*" exact element={<TezTunesHome wallet={wallet} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
