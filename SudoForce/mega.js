import { InMemorySigner } from '@taquito/signer';

const { secretKey } = await InMemorySigner.generateKeys(); // This will give you a valid key
console.log(`Your new private key: ${secretKey}`);
