import React, { useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { bytes2Char } from "@taquito/utils";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CertificateManagement = () => {
  const [activeCertificates, setActiveCertificates] = useState([]);
  const [revokedCertificates, setRevokedCertificates] = useState([]);
  const [Tezos, setTezos] = useState(
    new TezosToolkit("https://ghostnet.smartpy.io")
  );
  const [wallet, setWallet] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const initContract = async () => {
      try {
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        const contract = await Tezos.wallet.at(contractAddress);
        setContract(contract);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initContract();
  }, [Tezos.wallet]);

  useEffect(() => {
    const initWallet = async () => {
      const wallet = new BeaconWallet({
        name: "Certificate Management dApp",
        preferredNetwork: "ghostnet",
      });
      setWallet(wallet);
      Tezos.setWalletProvider(wallet);
    };

    initWallet();
  }, []);

  useEffect(() => {
    fetchCertificates();
    fetchRevokedCertificates();
  }, []);

  const handleNavigateHome = () => {
    window.location.href = "/issuer";
  };

  const fetchCertificates = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/certificates`);
      const data = await response.json();
      setActiveCertificates(data.certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const fetchRevokedCertificates = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/certificates/revoked`);
      const data = await response.json();
      setRevokedCertificates(data.revokedCertificates);
    } catch (error) {
      console.error("Error fetching revoked certificates:", error);
    }
  };

  const connectWallet = async () => {
    try {
      await wallet.requestPermissions({ network: { type: "ghostnet" } });
      const pkh = await wallet.getPKH();
      setUserAddress(pkh);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const updateBackendAfterRevocation = async (certificate) => {
    try {
      const response = await fetch(`${BACKEND_URL}/certificates/revoke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          certificateId: certificate._id,
          certificateHash: certificate.certificateHash,
          walletAddress: certificate.wallet_address,
          metadata: certificate.metadata,
          expiryDate: certificate.expiryDate,
          revocationDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update backend after revocation");
      }

      setActiveCertificates((prevCerts) =>
        prevCerts.filter((cert) => cert._id !== certificate._id)
      );

      await fetchRevokedCertificates();
    } catch (error) {
      console.error("Error updating backend after revocation:", error);
      alert(
        "Warning: The certificate was revoked on the blockchain but there was an error updating the database. Please refresh the page and check the status."
      );
    }
  };

  const revokeCertificate = async (certificateHash, userAddress) => {
    if (!userAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!contract) {
      alert("Contract not initialized yet. Please try again in a moment.");
      return;
    }

    const certificate = activeCertificates.find(
      (cert) => cert.certificateHash === certificateHash
    );
    if (!certificate) {
      alert("Certificate not found");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [certificateHash]: true }));

    try {
      const op = await contract.methods
        .revoke_certificate(certificateHash, userAddress)
        .send();

      await op.confirmation(1);
      await updateBackendAfterRevocation(certificate);
      alert(`Certificate revoked successfully! Operation hash: ${op.hash}`);
    } catch (error) {
      console.error("Error revoking certificate:", error);
      alert(`Failed to revoke certificate: ${error.message}`);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [certificateHash]: false }));
    }
  };

  const CertificateTable = ({ certificates, type }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        {type === "active" ? "Active Certificates" : "Revoked Certificates"}
      </h2>
      <table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2">Certificate Hash</th>
            <th className="px-4 py-2">Wallet Address</th>
            <th className="px-4 py-2">Metadata</th>
            <th className="px-4 py-2">Expiry Date</th>
            {type === "active" && <th className="px-4 py-2">Action</th>}
            {type === "revoked" && (
              <th className="px-4 py-2">Revocation Date</th>
            )}
          </tr>
        </thead>
        <tbody>
          {certificates.map((cert) => (
            <tr key={cert._id} className="border-b border-gray-700">
              <td className="px-4 py-2">{cert.certificateHash}</td>
              <td className="px-4 py-2">{cert.wallet_address}</td>
              <td className="px-4 py-2">{cert.metadata}</td>
              <td className="px-4 py-2">
                {cert.expiryDate
                  ? new Date(cert.expiryDate).toLocaleDateString()
                  : "N/A"}
              </td>
              {type === "active" && (
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      revokeCertificate(
                        cert.certificateHash,
                        cert.wallet_address
                      )
                    }
                    disabled={loadingStates[cert.certificateHash]}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300 disabled:bg-gray-500"
                  >
                    {loadingStates[cert.certificateHash]
                      ? "Revoking..."
                      : "Revoke"}
                  </button>
                </td>
              )}
              {type === "revoked" && (
                <td className="px-4 py-2">
                  {new Date(cert.revocationDate).toLocaleString()}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="absolute top-4 left-4">
        <button
          onClick={handleNavigateHome}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-900/50 flex items-center space-x-2"
        >
          <span>Back to Home</span>
        </button>
      </div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Certificate Management
      </h1>
      <div className="max-w-6xl mx-auto h-[90vh] flex flex-col justify-around">
        <CertificateTable certificates={activeCertificates} type="active" />
        <div className="mt-8">
          <CertificateTable certificates={revokedCertificates} type="revoked" />
        </div>
      </div>
    </div>
  );
};

export default CertificateManagement;
