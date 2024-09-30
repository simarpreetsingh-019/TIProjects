// TODO 2.a - Setup a Beacon Wallet instance
import { BeaconWallet } from "@taquito/beacon-wallet";
import {NetworkType} from "@airgap/beacon-dapp";

export const wallet = new BeaconWallet({
    name: "HRM",
    preferredNetwork: NetworkType.GHOSTNET
})

export const connectWallet = async () => {
    await wallet.requestPermissions({network: {type: NetworkType.GHOSTNET}});
};

// TODO 2.c - Complete getAccount function
export const getAccount = async () => {
    console.log("getAccount Called")
    const connectedWallet = await wallet.client.getActiveAccount();
    
    if (connectedWallet){
        return connectedWallet.address;
    } else {
        return "";
    }
};

// disconnect wallet
export const disconnectWallet = async () => {
    await wallet.client.removeAllAccounts();
}