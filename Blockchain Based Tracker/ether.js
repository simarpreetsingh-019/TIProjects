const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/f5e8f07ac5d8484f9344fad87ce4d3b6");

const wallet = new ethers.Wallet("your-private-key", provider);

async function deployContract() {
    const bytecode = "0x...";  // Your contract's compiled bytecode
    const abi = [ /* Your contract's ABI here */ ];

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    
    console.log("Deploying contract...");
    
    const contract = await factory.deploy();
    
    console.log("Contract deployed at:", contract.address);

    await contract.deployTransaction.wait();

    console.log("Contract mined at:", contract.address);
}

deployContract().catch(console.error);
