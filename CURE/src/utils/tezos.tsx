// TODO 1 - Setup Tezos Toolkit
import { TezosToolkit } from "@taquito/taquito";
import { wallet } from "./wallet";


export const tezos = new TezosToolkit("https://ghostnet.smartpy.io");

// TODO 3 - Specify wallet provider for Tezos instance

tezos.setWalletProvider(wallet)