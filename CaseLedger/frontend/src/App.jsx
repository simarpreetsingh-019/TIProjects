import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./contractJson/Upload.json";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ConnectButton from "./miniComponents/ConnectButton";
import fox from "./assets/images/fox.jpeg";
import fox2 from "./assets/images/fox2.jpeg";
import NavBar from "./miniComponents/NavBar";
import UploadCase from "./components/UploadCase";
import ShareAccess from "./components/ShareAccess";
import NotAllowed from "./components/NotAllowed";
import NotFound from "./components/NotFound";
import SecureDisplay from "./components/SecureDisplay";
import manage from "./assets/images/manage.jpeg";
import store from "./assets/images/store.jpeg";
import share from "./assets/images/share.jpeg";
import OCRUpload from "./components/OCRUpload";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    account: null,
  });

  const [account, setAccount] = useState(
    localStorage.getItem("account") || "Not Connected"
  );
  const [modelOpen, setModelOpen] = useState(false);
  const [connected, setConnected] = useState(
    localStorage.getItem("connected") === "true" || false
  );

  useEffect(() => {
    if (connected) {
      connectToMetaMask();
    }
  }, []);

  const connectToMetaMask = async () => {
    const contractAddr = "0x04C340f664F9B3755B5916e4e72A63cF0475b857";
    const contractABI = abi.abi;

    console.log(contractABI, contractAddr);

    try {
      const { ethereum } = window;

      let signer = null;
      let provider;

      if (ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const chosenAccount = accounts[0];
        setAccount(chosenAccount);
        localStorage.setItem("account", chosenAccount);
        provider = new ethers.BrowserProvider(ethereum);
        signer = await provider.getSigner();
      }

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", (accounts) => {
        const chosenAccount = accounts[0];
        setAccount(chosenAccount);
        localStorage.setItem("account", chosenAccount);
        window.location.reload();
      });

      const contract = new ethers.Contract(contractAddr, contractABI, signer);
      setState({ provider, signer, contract, account });
      setConnected(true);
      localStorage.setItem("connected", true);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectFromMetaMask = () => {
    setConnected(false);
    setAccount("Not Connected");
    localStorage.setItem("connected", false);
    localStorage.removeItem("account");
    // Reset the state
    setState({
      provider: null,
      signer: null,
      contract: null,
      account: null,
    });
  };

  return (
    <div className="h-full justify-center items-center mx-auto bg-[#030014]">
      <Router>
        <NavBar />
        <Routes>
          <Route index />
          <Route
            path="/display"
            element={
              connected ? <SecureDisplay state={state} /> : <NotAllowed />
            }
          />
          <Route
            path="/upload"
            element={connected ? <UploadCase state={state} /> : <NotAllowed />}
          />
          <Route
            path="/share"
            element={connected ? <ShareAccess state={state} /> : <NotAllowed />}
          />
          {/* <Route path="/ocr" element={<OCRUpload/>} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>

      <div className="h-full px-[65px] pb-[65px] justify-center items-center mx-auto bg-[#030014] max-w-7xl">
        <div className="h-full px-[65px] pb-[65px] justify-center items-center mx-auto bg-[#030014] max-w-7xl">
          {!connected ? (
            <div className="flex flex-row gap-10 items-center justify-center h-full">
              <img
                src={fox}
                alt="per"
                border="0"
                className="mt-10 w-[50%] h-[80%]"
              />
              <div>
                <h1 className="text-3xl text-white mt-20">
                  Connect to Blockchain
                </h1>
                <ConnectButton
                  onClick={connectToMetaMask}
                  disabled={connected}
                  text={connected ? "Connected" : "Connect with MetaMask"}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-10 items-center justify-center h-full">
              <img
                src={fox2}
                alt="per"
                border="0"
                className="mt-10 w-[50%] h-[80%]"
              />
              <div>
                <h1 className="text-3xl text-white mt-20">
                  Connected to: <br />
                  {account}{" "}
                </h1>
                <button
                  className="mt-5 bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={disconnectFromMetaMask}
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Information section */}
        <div className="mt-20 text-center text-white">
          <h2 className="text-4xl font-bold">
            Decentralized Case Management System
          </h2>
          <p className="mt-5 text-gray-400">
            This platform leverages blockchain technology to provide secure,
            transparent, and tamper-proof management of case files. Using our
            system, you can upload, manage, and securely share case files with
            authorized personnel.
          </p>

          <div className="grid grid-cols-3 gap-10 mt-10">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src={manage}
                alt="Manage Cases"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-2xl text-white mt-4">Manage Cases</h3>
              <p className="text-gray-400 mt-2">
                Access and view the cases you're authorized to see, securely
                stored and encrypted on the blockchain.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src={store}
                alt="Upload Cases"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-2xl text-white mt-4">Upload Case Files</h3>
              <p className="text-gray-400 mt-2">
                Upload sensitive case information, ensuring it's securely stored
                with decentralized encryption.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img
                src={share}
                alt="Share Access"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-2xl text-white mt-4">Share Access</h3>
              <p className="text-gray-400 mt-2">
                Share access with trusted personnel to allow viewing or managing
                of case data, with full control over permissions.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-step process */}
        <div className="mt-20 text-center text-white">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <div className="grid grid-cols-3 gap-10 mt-10">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-white">Step 1: Connect</h3>
              <p className="text-gray-400 mt-2">
                Start by connecting your MetaMask wallet to gain access to the
                platform. You can view the cases you're authorized to manage.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-white">Step 2: Manage Cases</h3>
              <p className="text-gray-400 mt-2">
                After connecting, access the available cases. View details,
                download files, and manage access securely.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-white">Step 3: Share Access</h3>
              <p className="text-gray-400 mt-2">
                Control who has access to your case data. Use our access control
                to share files securely with trusted individuals.
              </p>
            </div>
          </div>
        </div>

        {/* Blockchain and Technology Explanation */}
        <div className="mt-20 text-center text-white">
          <h2 className="text-4xl font-bold">Understanding the Technology</h2>
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-white">What is Blockchain?</h3>
              <p className="text-gray-400 mt-2">
                Blockchain is a decentralized, immutable ledger that allows
                secure, transparent transactions without the need for a central
                authority. Every case you upload is encrypted and stored on the
                blockchain, ensuring data integrity and preventing unauthorized
                changes.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-white">Why IPFS?</h3>
              <p className="text-gray-400 mt-2">
                The InterPlanetary File System (IPFS) is a peer-to-peer protocol
                designed to make the web faster, safer, and more open. We use
                IPFS to store large case files in a decentralized manner,
                ensuring that files are tamper-proof, easily accessible, and not
                reliant on a single server.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-10">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-white">Etherlink (Layer 1 EVM)</h3>
              <p className="text-gray-400 mt-2">
                Etherlink, a Layer 1 Ethereum Virtual Machine (EVM) compatible
                blockchain, provides a robust and widely supported platform for
                smart contract execution. It enables us to integrate
                decentralized case management seamlessly while benefiting from
                Ethereum's large ecosystem.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-white">Why Tezos?</h3>
              <p className="text-gray-400 mt-2">
                Tezos is a blockchain platform known for its energy efficiency
                and governance features. By utilizing Tezos, we ensure that our
                system remains scalable and cost-effective, while leveraging the
                platform's advanced on-chain governance to adapt to future
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
