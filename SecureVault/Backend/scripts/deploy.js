const { ethers } = require("hardhat");

async function main() {
    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy();
    await verifier.deployed();

    const AgeVerification = await ethers.getContractFactory("AgeVerification");
    const ageVerification = await AgeVerification.deploy();
    await ageVerification.deployed();

    console.log("Verifier contract deployed to:", verifier.address);
    console.log("AgeVerification contract deployed to:", ageVerification.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });