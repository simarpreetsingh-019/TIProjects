import Web3 from 'web3';
import DigitalArtContract from './abi/DigitizedArt.json'

export const getWeb3 = () =>
    new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
        await window.ethereum.enable();
        resolve(web3);
        } catch (error) {
        reject(error);
        }
    } else if (window.web3) {
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
    } else {
        console.log(process.env.PUBLIC_URL)
        const provider = new Web3.providers.HttpProvider("https://node.ghostnet.etherlink.com");
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
    }
    });
});


export const getInstance = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const gasLimit = '8000000';
    window.user = (await web3.eth.getAccounts())[0];
    
    const contractAddress = await getContractAddress(networkId); 
    if (!contractAddress) {
        throw new Error("Contract address not found for the current network");
    }

    window.instance = new web3.eth.Contract(
        DigitalArtContract.abi,
        contractAddress,
        {
            from: window.user,
            gas:gasLimit,
        }
    );
    
    return window.instance;
};

export const getContractAddress = async (networkId) => {
    const deployedNetwork = DigitalArtContract.networks[networkId];
    if (deployedNetwork && deployedNetwork.address) {
        return deployedNetwork.address;
    } else {
        throw new Error(`Contract address not found for networkId: ${networkId}`);
    }
};

