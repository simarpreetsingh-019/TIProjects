const hre = require("hardhat");

async function main() {
  const lock = await hre.ethers.deployContract("RealEstate");

  await lock.waitForDeployment();

  console.log(`Lock Address: ${lock.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//npx hardhat run scripts/deploy.js --network polygon_amoy
//npx hardhat run scripts/deploy.js --network localhost
