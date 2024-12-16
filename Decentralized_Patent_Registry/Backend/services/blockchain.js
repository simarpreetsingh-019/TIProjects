// services/blockchain.js

require('dotenv').config();  // Load environment variables from .env file

const {Web3} = require('web3');
const { abi } = require('../Contracts/PatentRegistry.json');
const web3 = new Web3(process.env.INFURA_API_URL);
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

// Register a new patent on the blockchain
async function registerPatentOnBlockchain(title, description, userAddress) {
    try {
        const tx = contract.methods.registerPatent(title, description);
        const gas = await tx.estimateGas({ from: userAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: process.env.CONTRACT_ADDRESS,
                data,
                gas,
                gasPrice,
                from: userAddress
            },
            process.env.PRIVATE_KEY
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        const processedReceipt = JSON.parse(JSON.stringify(receipt, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        return processedReceipt;
    } catch (error) {
        console.error("Error registering patent:", error);
        throw error;
    }
}

// Transfer a patent on the blockchain
async function transferPatentOnBlockchain(patentId, toAddress, fromAddress) {
    try {
        if (!web3.utils.isAddress(toAddress) || !web3.utils.isAddress(fromAddress)) {
            throw new Error('Invalid Ethereum address.');
        }

        const tx = contract.methods.transferPatent(patentId, toAddress);
        const gas = await tx.estimateGas({ from: fromAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: process.env.CONTRACT_ADDRESS,
                data,
                gas,
                gasPrice,
                from: fromAddress
            },
            process.env.PRIVATE_KEY
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
    } catch (error) {
        console.error("Error transferring patent:", error);
        throw error;
    }
}

// Get patent details from the blockchain
async function getPatentDetailsFromBlockchain(patentId) {
    try {
        const details = await contract.methods.getPatentDetails(patentId).call();
        return details;
    } catch (error) {
        console.error("Error fetching patent details:", error);
        throw error;
    }
}

module.exports = {
    registerPatentOnBlockchain,
    transferPatentOnBlockchain,
    getPatentDetailsFromBlockchain
};