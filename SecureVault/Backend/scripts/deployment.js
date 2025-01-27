async function main() {
    // Get the contract factory (like a class to deploy instances)
    const MyContract = await ethers.getContractFactory("AgeVerification");
  
    // Deploy the contract
    const myContract = await MyContract.deploy();
  
    // Wait for the contract to be mined
    await myContract.deployed();
  
    console.log("Contract deployed to:", myContract.address);
  }
  
  // Error handling
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
