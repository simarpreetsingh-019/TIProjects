var DigitizedArt = artifacts.require("./DigitizedArt.sol");

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
    try {
      await deployer.deploy(DigitizedArt, "DigitalArtToken", "DT");
    } catch (err) {
      console.log(('Failed to Deploy Contracts', err))
    }
  })

}