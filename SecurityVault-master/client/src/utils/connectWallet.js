import { ethers } from "ethers";
import contractAbi from '../constants/contractAbi.json';
import toast from "react-hot-toast";
import axios from 'axios';

export const connectWallet = async() => {
    try {
        if (!window.ethereum) {
            throw new Error("Metamask is not installed");
        }
    
        const accounts = await window.ethereum.request({
            method:"eth_requestAccounts"
        })
    
        const selectedAccount = accounts[0];
    
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer =await provider.getSigner();
        
        const message = "Welcome to Anurag Kaushik Project";
        const signature = await signer.signMessage(message);

        const dataSignature = {
            signature
        }

        const url=`http://localhost:3000/api/authentication?address=${selectedAccount}`;
        const res = await axios.post(url, dataSignature);
        const token = res.data.token
        localStorage.setItem("token", token);

        const contractAddress = "0xe336d36FacA76840407e6836d26119E1EcE0A2b4";
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    
        return {contractInstance, selectedAccount};
    } 
    catch(error) {
        toast.error("wallect connection failed");
        console.error(error);
    }
}