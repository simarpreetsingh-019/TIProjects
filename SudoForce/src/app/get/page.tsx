/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Button, Form, Spinner, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { Buffer } from "buffer";
import { getAllFiles } from "@/utils/helper";
import { abi } from './../../utils/abi'

import { ethers } from 'ethers'

// Extend the Window interface to include the ethereum property
declare global {
    interface Window {
        ethereum: any;
    }
}


export default function DecryptPage() {
    const [hash, setHash] = useState("");
    const [decryptionKey, setDecryptionKey] = useState("");
    const [decryptedFileURL, setDecryptedFileURL] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const decryptBuffer = async (
        encryptedBuffer: ArrayBuffer,
        iv: Uint8Array,
        keyHex: string
    ) => {
        try {
            // Convert the hex key back into a CryptoKey object
            const keyBuffer = Buffer.from(keyHex, "hex");
            const cryptoKey = await window.crypto.subtle.importKey(
                "raw",
                keyBuffer,
                { name: "AES-GCM" },
                true,
                ["decrypt"]
            );

            // Decrypt the buffer
            const decrypted = await window.crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                },
                cryptoKey,
                encryptedBuffer
            );
            return new Uint8Array(decrypted);
        } catch (error) {
            console.error("Error decrypting file:", error);
            setErrorMessage("Error decrypting file. Please check your key.");
            return null;
        }
    };

    const handleDownloadAndDecrypt = async () => {
        if (!hash || !decryptionKey) {
            setErrorMessage("Please enter both the IPFS hash and decryption key.");
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            // Download the encrypted file from IPFS
            const response = await axios.get(`https://ipfs.io/ipfs/${hash}`, {
                responseType: "arraybuffer",
            });

            // Extract IV and encrypted data
            const iv = new Uint8Array(response.data.slice(0, 12)); // First 12 bytes are IV
            const encryptedData = response.data.slice(12); // The rest is the encrypted data

            // Decrypt the file
            const decrypted = await decryptBuffer(encryptedData, iv, decryptionKey);
            if (decrypted) {
                // Convert the decrypted file into a Blob and create an object URL
                const blob = new Blob([decrypted], { type: "image/png" }); // You can adjust the MIME type as needed
                const url = URL.createObjectURL(blob);
                setDecryptedFileURL(url); // Set the URL to display the image
            }
        } catch (err) {
            console.error("Error downloading or decrypting file:", err);
            setErrorMessage("An error occurred. Please check the IPFS hash or decryption key.");
        } finally {
            setLoading(false);
        }
    };

    const [account, setAccount] = useState("");
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    // const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        console.log(ethers);
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const loadProvider = async () => {
            if (provider) {
                window.ethereum.on("chainChanged", () => {
                    window.location.reload();
                });

                window.ethereum.on("accountsChanged", () => {
                    window.location.reload();
                });
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                const contractAddress = "0xBCE1C300984662027136530c20734315B882dB70";

                const contract: any = new ethers.Contract(contractAddress, abi, signer);
                // contract.getFiles().then((files) => {
                //   console.log(files);
                // }).catch((e) => {
                //   console.error(e);
                // })
                //console.log(contract);
                setContract(contract);
                setProvider(provider);
                console.log("Metamask is installed");
                console.log(contract, provider, account);
            } else {
                console.error("Metamask is not installed");
            }
        };
        if (provider) loadProvider();
    }, []);
    useEffect(() => {
        if (!contract) return;
        getAllFiles(contract)
            .then((res) => {
                console.log("got files from blockchain: ", res);
            })
            .catch((e) => {
                console.error(e);
            });

    }, [contract]);




    return (
        <div className="flex  h-screen w-screen justify-center items-center ">
            <Card className="p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
                <h2 className="mb-4 text-center">Download and Decrypt File</h2>
                <Form>
                    <Form.Group controlId="ipfsHash" className="mb-3">
                        <Form.Label>IPFS Hash</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the IPFS hash"
                            value={hash}
                            onChange={(e) => setHash(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="decryptionKey" className="mb-4">
                        <Form.Label>Decryption Key</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the decryption key"
                            value={decryptionKey}
                            onChange={(e) => setDecryptionKey(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={handleDownloadAndDecrypt}
                        disabled={loading}
                        className="w-100 mb-3"
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />{" "}
                                Decrypting...
                            </>
                        ) : (
                            "Download and Decrypt"
                        )}
                    </Button>
                </Form>

                {errorMessage && (
                    <Alert variant="danger" className="mt-3">
                        {errorMessage}
                    </Alert>
                )}

                {decryptedFileURL && (
                    <div className="mt-4 text-center">
                        <Alert variant="success">Decryption Successful!</Alert>
                        <img src={decryptedFileURL} alt="Decrypted File" className="img-fluid mb-3" />
                        <a
                            href={decryptedFileURL}
                            download="decrypted_image.png"
                            className="btn btn-success"
                        >
                            Download Decrypted File
                        </a>
                    </div>
                )}
            </Card>


        </div>
    );
}