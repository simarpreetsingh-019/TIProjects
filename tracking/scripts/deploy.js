const hre = require("hardhat");

async function main() {
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const tracking = await Tracking.deploy();

  await tracking.deployed();

  console.log(`Tracking deployed to ${tracking.address}`);
}

//npx hardhat run scripts/deploy.js --network polygon_amoy
//npx hardhat run scripts/deploy.js --network localhost

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
