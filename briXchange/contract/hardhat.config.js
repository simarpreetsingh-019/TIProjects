require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = "788ed93b169bc440019d1adbde09d1d8658e08fee24f37dd2de18d4ca0279cce";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    // hardhat: {
    //   chainId: 31337,
    // },
    etherlink_testnet: {
      url: "https://etherlink-testnet.rpc.thirdweb.com/",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
