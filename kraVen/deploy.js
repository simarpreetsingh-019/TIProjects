const hre = require("hardhat");

async function main() {
    const Warranty = await hre.ethers.getContractFactory("Warranty"); // Contract name ka case match karein
    const warranty = await Warranty.deploy();

    await warranty.deployed();
    
    // Contract address ko sahi tarike se log karein
    console.log("Warranty contract deployed to:", warranty.address); // Yahan warranty.address use karna hai
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
