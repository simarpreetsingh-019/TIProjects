// src/app/components/tezos.js

import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

let Tezos;
let wallet;

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
    // Only initialize in the browser
    wallet = new BeaconWallet({ name: "My DApp" });
    Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
    Tezos.setWalletProvider(wallet);
}

export const connectWallet = async () => {
    if (!isBrowser) {
        throw new Error('This function can only be called in the browser');
    }

    if (!wallet) {
        throw new Error('Wallet is not initialized');
    }

    await wallet.requestPermissions({ network: { type: 'mainnet' } });
};

export const getActiveAccount = async () => {
    if (!isBrowser) {
        throw new Error('This function can only be called in the browser');
    }

    return wallet?.client?.getActiveAccount();
};

export const getTezosInstance = () => {
    if (!isBrowser) {
        throw new Error('This function can only be called in the browser');
    }

    return Tezos;
};
