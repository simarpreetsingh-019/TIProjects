// src/App.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getCid, fetchDocumentFromIPFS } from './api';
import AgeVerificationABI from './AgeVerification.json';

const contractAddress = "0x4aa8863dd0c93793b2925b7f9c72700fbc1e11ac";

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const connectMetaMask = async () => {
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Set the user's Ethereum address
            setUserAddress(accounts[0]); // Store the first account address
            console.log('Connected account:', accounts[0]);
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    };
    const verifyAgeWithContract = async (age) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, AgeVerificationABI, signer);
        console.log("before");
        const ageBigNumber = ethers.BigNumber.from(age);
        console.log("BigNumber Age:", ethers.BigNumber.from(age));
        console.log("doneeee");
        const tx = await contract.verifyAge([ageBigNumber]);
        await tx.wait(); // Wait for the transaction to be mined
        console.log(tx);
    };

    const handleAgeVerification = async () => {
        try {
            const cid = await getCid(username, password);
            const onbject = await fetchDocumentFromIPFS(cid);
            console.log(onbject);
            await verifyAgeWithContract(onbject);
            console.log(1);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, AgeVerificationABI, signer);
            const isVerified = await contract.isUserAbove18(await signer.getAddress());
            setResult("Verification successful! Above 18: ${isVerified}");
        } catch (error) {
            console.error("Error during age verification:", error);
            setResult("Error during verification. Check console for details.");
        }
    };

    return (
        <div className='box'>
            <h1>Age Verification</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleAgeVerification}>Verify Age</button>
            <h2>Verification Result</h2>
            <p>{result}</p>
        </div>
    );
};

export default App;