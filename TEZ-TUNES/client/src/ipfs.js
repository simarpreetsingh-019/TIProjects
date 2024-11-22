// src/ipfs.js
import { create } from 'ipfs-http-client';

// Infura IPFS Gateway
const ipfs = create('https://ipfs.infura.io:5001/api/v0');
export default ipfs;
