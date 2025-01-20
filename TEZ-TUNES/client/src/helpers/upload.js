// Initialize NFT.Storage client with your API token
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: "your_api_key_here",
  pinataGateway: "https://gateway.pinata.cloud/ipfs",
});

export async function uploadToPinata(file) {
  const apiKey = "your_api_key_here";
  const secretApiKey = "your_secret_api_key_here";
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        pinata_api_key: apiKey,
        pinata_secret_api_key: secretApiKey,
      },
      body: formData,
    }
  );

  const data = await response.json();
  return data.IpfsHash;
}
