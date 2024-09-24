require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY2 = process.env.PRIVATE_KEY;
const ETHERLINKTEST_URL = process.env.ETHERLINKTEST_URL;

module.exports = {
  solidity: "0.8.24",
  networks: {
    // etherlinkMainnet: {
    //   url: "https://node.mainnet.etherlink.com",
    //   accounts: ["<YOUR_PRIVATE_KEY>"],
    // },
    etherlinkTestnet: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: ["68bbd3268772eff6c9c702e3c1545da7a72d89c71409292a421614d3c32e9b13"],
    },
  },
  etherscan: {
    apiKey: {
      etherlinkMainnet: "YOU_CAN_COPY_ME",
      etherlinkTestnet: "YOU_CAN_COPY_ME",
    },
    customChains: [
      {
        network: "etherlinkMainnet",
        chainId: 128123,
        urls: {
          apiURL: "https://explorer.etherlink.com/api",
          browserURL: "https://explorer.etherlink.com",
        },
      },
      {
        network: "etherlinkTestnet",
        chainId: 128123,
        urls: {
          apiURL: "https://testnet.explorer.etherlink.com/api",
          browserURL: "https://testnet.explorer.etherlink.com",
        },
      },
    ],
  },
};


// Etherlink contract addr: 0x04C340f664F9B3755B5916e4e72A63cF0475b857