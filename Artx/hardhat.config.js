require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: ["59704cdec21122c1e86e805d998f3a7609c6bc2d59c0d1ed57b82bdcd031eb60"],
    },
  },
};
