import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

const Tezos = new TezosToolkit('https://rpc.ghostnet.teztnets.com');

// Set the signer using InMemorySigner
const privateKey = 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq'; // Replace with your actual private key
Tezos.setProvider({ signer: new InMemorySigner(privateKey) });

// Address of the contract
const contractAddress = 'KT1DNLFAu3j7PUmq8arzyAV7diRewYxAP3bt';

// Interact with the contract
Tezos.contract
    .at(contractAddress)
    .then((contract) => {
        // Log available entry points
        // console.log('Available entry points:', contract);

        // Call the hello_world entry point
        return contract.methodsObject.increment(3).send();
    })
    .then((op) => {
        console.log(`Waiting for ${op.hash} to be confirmed...`);
        return op.confirmation(1).then(() => op.hash);
    })
    .then((hash) => console.log(`Operation injected: https://ghost.tzstats.com/${hash}`))
    .catch((error) => {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error(`Unexpected error: ${JSON.stringify(error)}`);
        }
    });
