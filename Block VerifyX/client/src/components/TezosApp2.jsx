import React, { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { char2Bytes } from "@taquito/utils";
import { validateAddress } from "@taquito/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const TezosApp2 = () => {
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://ghostnet.smartpy.io")
  );
  const [wallet, setWallet] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [certificateHash, setCertificateHash] = useState("");
  const [wallet_address, setwallet_address] = useState("");
  const [uploadDate, setUploadDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState("");
  const [isExpiry, setIsExpiry] = useState(false);
  const [metadata, setMetadata] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [walletAddressError, setWalletAddressError] = useState("");

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const handleNavigateToManagement = () => {
    window.location.href = "/issuer/certificate-management";
  };

  const handleNavigateHome = () => {
    window.location.href = "/";
  };
  const handleUpload = async () => {
    const file = document.querySelector('input[type="file"]').files[0];
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const currentDate = new Date();
    setUploadDate(currentDate);

    // fetch(`${BACKEND_URL}/uploaddoc`, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //     setCertificateHash(data.hash);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     setErrorMessage("Failed to upload file. Please try again.");
    //   });
    const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setCertificateHash(hashHex);
      console.log(hashHex);
      const hashBinary = char2Bytes(hashHex);
  };

  useEffect(() => {
    const wallet = new BeaconWallet({
      name: "My Tezos DApp",
      network: { type: "ghostnet" },
    });
    setWallet(wallet);
    Tezos.setWalletProvider(wallet);
  }, []);

  const connectWallet = async () => {
    try {
      await wallet.requestPermissions({
        network: { type: "ghostnet" },
      });
      const pkh = await wallet.getPKH();
      console.log("Wallet connected:", pkh);

      const walletBalance = await Tezos.tz.getBalance(pkh);
      const balanceInTez = walletBalance.toNumber() / 1000000;
      setBalance(balanceInTez);
      setUserAddress(pkh);
      console.log("Balance:", balanceInTez);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setErrorMessage("Failed to connect wallet. Please try again.");
    }
  };

  const checkContractExists = async () => {
    try {
      await Tezos.contract.at(contractAddress);
      return true;
    } catch (error) {
      console.error("Contract not found:", error);
      setErrorMessage(
        `Contract not found at address ${contractAddress}. Please check the contract address.`
      );
      return false;
    }
  };

  const handleWalletAddressChange = (e) => {
    const address = e.target.value;
    setwallet_address(address);

    if (address && !validateAddress(address)) {
      setWalletAddressError("Invalid Tezos address format");
    } else {
      setWalletAddressError("");
    }
  };

  const addCertificate = async () => {
    if (!certificateHash || !uploadDate || !metadata || !wallet_address) {
      setErrorMessage("Please fill in all required fields and upload a file.");
      return;
    }

    if (isExpiry && !expiryDate) {
      setErrorMessage(
        "Please set an expiry date or uncheck the expiry option."
      );
      return;
    }

    if (!validateAddress(wallet_address)) {
      setErrorMessage("Please enter a valid Tezos wallet address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const contractExists = await checkContractExists();
      if (!contractExists) {
        setLoading(false);
        return;
      }

      const contract = await Tezos.wallet.at(contractAddress);
      const bytes = char2Bytes(certificateHash);
      const timestamp = Math.floor(uploadDate.getTime() / 1000);
      const expiryTimestamp = isExpiry
        ? Math.floor(new Date(expiryDate).getTime() / 1000)
        : 0;
 console.log(bytes);
      const op = await contract.methods
        .store_certificate(
          bytes,
          expiryTimestamp,
          isExpiry,
          metadata,
          wallet_address
        )
        .send();
      await op.confirmation();
      const response = await fetch(`${BACKEND_URL}/store-transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificateHash,
          wallet_address,
          metadata,
          expiryDate: isExpiry ? new Date(expiryDate).toISOString() : null,
        }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to store transaction in database");
      }

      alert("Certificate added successfully to blockchain and database!");
      resetForm();
    } catch (error) {
      console.error("Error adding certificate:", error);
      setErrorMessage(`Error adding certificate: ${error.message}`);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setCertificateHash("");
    setUploadDate(null);
    setExpiryDate("");
    setIsExpiry(false);
    setMetadata("");
    setwallet_address("");
  };

  return (
    <div className="min-h-[100vh] w-[100%] bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">

      <div className="absolute top-4 right-4">
        <button
          onClick={handleNavigateToManagement}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 
                     hover:from-purple-700 hover:to-purple-800 text-white rounded-lg 
                     font-medium transition-all duration-300 shadow-lg shadow-purple-900/50
                     flex items-center space-x-2"
        >
          <span>Manage Certificates</span>
        </button>
      </div>
      <div className="max-w-lg mx-auto h-[100vh] flex flex-col justify-center items-center">
        <div className="text-center mb-6 pb-5">
          <div className="flex justify-center mb-4">
            <img
              src="./src/assets/nit-logo.png"
              alt="NIT Logo"
              className="h-20 w-20 bg-white rounded-full shadow-lg shadow-gray-900/50"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">
            National Institute of Technology
          </h1>
          <h2 className="text-xl font-bold text-white mt-1">Tiruchirappalli</h2>
          <h3 className="text-lg text-gray-400 mt-2">
            Certificate Verification System
          </h3>
        </div>
        <Card className="shadow-2xl bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 overflow-auto">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-xl text-center text-white">
              Digital Certificate Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {!userAddress ? (
              <div className="space-y-4 py-4">
                <p className="text-center text-gray-400">
                  Connect your Temple wallet to begin the verification process
                </p>
                <button
                  onClick={connectWallet}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                         text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-900/50"
                >
                  Connect Temple Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-5 overflow-y-hidden">
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-gray-600 rounded-lg bg-gray-100 
                              hover:bg-gray-700/50 transition-colors duration-300"
                  >
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <span className="text-blue-400 m-1 hover:text-blue-300">
                        Choose PDF file
                      </span>
                      <span className="text-sm text-gray-400 m-1">
                        or drag and drop
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={handleUpload}
                    className="w-full py-2 bg-gradient-to-r from-green-600 to-green-700 
                           hover:from-green-700 hover:to-green-800 text-white rounded-lg 
                           transition-all duration-300 shadow-lg shadow-green-900/50"
                  >
                    Upload Certificate
                  </button>
                </div>

                {uploadDate && (
                  <div className="text-sm text-gray-400">
                    Upload Date: {uploadDate.toLocaleString()}
                  </div>
                )}

                <div className="space-y-2">
                  <input
                    type="text"
                    value={metadata}
                    onChange={(e) => setMetadata(e.target.value)}
                    placeholder="Metadata"
                    className="w-full p-2 bg-gray-100 border border-gray-600 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           text-black placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isExpiry}
                      onChange={(e) => setIsExpiry(e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-black">Set Expiry Date</label>
                  </div>
                  {isExpiry && (
                    <input
                      type="datetime-local"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full p-2 bg-gray-100 border border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             text-black"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={wallet_address}
                    onChange={handleWalletAddressChange}
                    placeholder="Wallet Address"
                    className={`w-full p-2 bg-gray-100 border rounded-lg 
                              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                              text-black placeholder-gray-400 ${
                                walletAddressError
                                  ? "border-red-500"
                                  : "border-gray-600"
                              }`}
                  />
                  {walletAddressError && (
                    <p className="text-red-500 text-sm">{walletAddressError}</p>
                  )}
                </div>

                <button
                  onClick={addCertificate}
                  disabled={loading || walletAddressError}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 
                         hover:from-blue-700 hover:to-blue-800 text-white rounded-lg 
                         font-medium transition-all duration-300 shadow-lg shadow-blue-900/50
                         disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      Processing...
                    </span>
                  ) : (
                    "Add Certificate to Blockchain"
                  )}
                </button>

                {errorMessage && (
                  <div className="p-3 bg-red-900/30 text-red-400 rounded-lg border border-red-800/50 backdrop-blur-sm">
                    {errorMessage}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TezosApp2;
