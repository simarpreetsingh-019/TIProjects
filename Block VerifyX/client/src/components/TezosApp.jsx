import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { sha256 } from "js-sha256";
import { nanoid } from "nanoid";
import { char2Bytes } from "@taquito/utils";
import { Wallet, Upload, ShieldCheck, Plus } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;


const INSTITUTES = [
  { name: "NITT", walletAddress: "tz1Shu3ZMUbJqCvVin4zBGjqzfMPsXHYwfVw" },
  { name: "NITK", walletAddress: "tz1VQnqCCqX4K5sP3FNkVSNKTdCAMJDd3E8n" },
  { name: "IITM", walletAddress: "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6" },
];

const TezosApp = () => {
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://ghostnet.smartpy.io")
  );
  const [wallet, setWallet] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [contract, setContract] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [customInstitute, setCustomInstitute] = useState({
    name: "",
    walletAddress: "",
  });
  const [isCustomInstitute, setIsCustomInstitute] = useState(false);
  const [recipientWallet, setRecipientWallet] = useState("");

  useEffect(() => {
    const loadContract = async () => {
      if (isConnected) {
        try {
          const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);
          setContract(contract);
        } catch (error) {
          console.error("Error loading contract:", error);
          setErrorMessage(
            "Failed to load the smart contract. Please try again."
          );
        }
      }
    };

    loadContract();
  }, [isConnected, Tezos.wallet]);

  const connectWallet = async () => {
    try {
      const wallet = new BeaconWallet({
        name: "My Tezos DApp",
        preferredNetwork: "ghostnet",
      });
      await wallet.requestPermissions({ network: { type: "ghostnet" } });
      const userAddress = await wallet.getPKH();
      setWallet(wallet);
      setUserAddress(userAddress);
      setIsConnected(true);
      const tezos = new TezosToolkit("https://ghostnet.smartpy.io");
      tezos.setWalletProvider(wallet);
      setTezos(tezos);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setErrorMessage("Failed to connect wallet. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.file;
    const file = fileInput.files[0];

    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    if (!selectedInstitute && !isCustomInstitute) {
      setErrorMessage("Please select an institute.");
      return;
    }

    if (
      isCustomInstitute &&
      (!customInstitute.name || !customInstitute.walletAddress)
    ) {
      setErrorMessage("Please provide both institute name and wallet address.");
      return;
    }

    if (!recipientWallet) {
      setErrorMessage("Please provide the recipient's wallet address.");
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      const hashBinary = char2Bytes(hashHex);

      if (!contract) {
        throw new Error("Smart contract not loaded");
      }

      const randomString = nanoid(30);
      const instituteWallet = isCustomInstitute
        ? customInstitute.walletAddress
        : selectedInstitute;

      const operation = await contract.methods
        .verify_certificate(
          hashBinary,
          randomString,
          instituteWallet,
          recipientWallet
        )
        .send();

      await operation.confirmation();

      const storage = await contract.storage();
      const verificationData = await storage.verifications.get(randomString);

      if (verificationData.is_verified) {
        setSuccessMessage("Certificate verified on the blockchain");

        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("walletAddress", userAddress);

        const response = await fetch(`${BACKEND_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file to server");
        }

        setSuccessMessage(
          "Certificate verified on the blockchain and uploaded to server"
        );
      } else {
        setErrorMessage(verificationData.comment);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to verify certificate. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzFmMjkzNyI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiMzNzQxNTEiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-xy"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Certificate Verification
            </h1>
            <p className="mt-2 text-lg text-gray-300">
              Authenticate your digital certificates securely on the Tezos
              blockchain
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-xl rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Digital Certificate Authentication
            </h2>

            <Link
              to="/admin/user-list"
              className="block w-full text-center mb-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              View User List
            </Link>

            {!isConnected ? (
              <div className="space-y-4">
                <p className="text-center text-gray-400 text-sm">
                  Connect your Temple wallet to begin the verification process
                </p>
                <button
                  onClick={connectWallet}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Wallet className="inline-block mr-2" size={20} />
                  Connect Temple Wallet
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium mb-2 text-gray-300"
                  >
                    Upload Certificate (PDF)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
                      </div>
                      <input
                        id="file-upload"
                        name="file"
                        type="file"
                        accept="application/pdf"
                        required
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Institute Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Select Institute
                  </label>
                  {!isCustomInstitute ? (
                    <select
                      value={selectedInstitute}
                      onChange={(e) => setSelectedInstitute(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an institute</option>
                      {INSTITUTES.map((institute) => (
                        <option
                          key={institute.walletAddress}
                          value={institute.walletAddress}
                        >
                          {institute.name} - {institute.walletAddress}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Institute Name"
                        value={customInstitute.name}
                        onChange={(e) =>
                          setCustomInstitute({
                            ...customInstitute,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Institute Wallet Address"
                        value={customInstitute.walletAddress}
                        onChange={(e) =>
                          setCustomInstitute({
                            ...customInstitute,
                            walletAddress: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsCustomInstitute(!isCustomInstitute)}
                    className="mt-2 inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {isCustomInstitute
                      ? "Select from list"
                      : "Add custom institute"}
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Recipient Wallet Address
                  </label>
                  <input
                    type="text"
                    value={recipientWallet}
                    onChange={(e) => setRecipientWallet(e.target.value)}
                    placeholder="wallet address"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <ShieldCheck className="inline-block mr-2" size={20} />
                  Verify Certificate
                </button>
              </form>
            )}
            {errorMessage && (
              <div className="mt-4 p-3 bg-red-900/30 text-red-400 rounded-md border border-red-800/50">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mt-4 p-3 bg-green-900/30 text-green-400 rounded-md border border-green-800/50">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TezosApp;
