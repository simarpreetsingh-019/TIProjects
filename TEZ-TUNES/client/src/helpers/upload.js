// Initialize NFT.Storage client with your API token
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1YTg1NzEyYi1mYjQxLTQ1NzktYjViMi1jOTNlZGExZDU0MmYiLCJlbWFpbCI6ImtyaXNobmF0aXdhcmlkdGVhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjYmY1YTRkYjIxOWM4YjY1YTE5YyIsInNjb3BlZEtleVNlY3JldCI6ImNlMWFhODM3ZTBkNTMwMTI2ZGZlZTlmZTc2ZDYxOTY4ZjNmNDEwNmM0MjBkYjBkZTUzNGM5ZTBhMjhjOTIwZWYiLCJleHAiOjE3NjE4MzEzOTV9.QUCIcs2aJ7_F8fLbuaUrQy4XTyToC7ZzSwz0t30dO0I",
  pinataGateway: "salmon-general-eel-568.mypinata.cloud",
});

export async function uploadToPinata(file) {
  const apiKey = "cbf5a4db219c8b65a19c";
  const secretApiKey =
    "ce1aa837e0d530126dfee9fe76d61968f3f4106c420db0d e534c9e0a28c920ef";
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
