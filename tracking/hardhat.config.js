require("@nomicfoundation/hardhat-toolbox");

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://rpc-amoy.polygon.technology/";
const NEXT_PUBLIC_PRIVATE_KEY = "YOUR_PRIVATE_KEY";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "matic",
  networks: {
    // hardhat: {
    //   chainId: 31337,
    // },
    polygon_amoy: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
};
