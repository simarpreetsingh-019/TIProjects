const ethers = require('ethers')
const UserModel = require('../models/User')
const {PINATA_APIKEY,PINATA_SECRETkEY}=require('../config/serverConfig');
const {generateEncryptionKey} = require('../utils/generateKey');
const {encryptFile}=require('../utils/encryption');

async function uploadImageController(req,res,next){
    try {
        const address = req.address;
        const userAddress=address.toLowerCase()
        const user=await UserModel.findOne({userAddress:userAddress})
        if(!user){
            throw new Error("User does not exist")
        } 
        if(user.encryptionKey===null){
            const encryptionKey=generateEncryptionKey(32);
            user.encryptionKey=encryptionKey;
            await user.save()
        }
        // console.log(user.encryptionKey);
        const { encryptedData, iv } = encryptFile(req.file.buffer,user.encryptionKey);
        

        const pinataSDK = require('@pinata/sdk');
        const pinata = new pinataSDK({ pinataApiKey: PINATA_APIKEY, pinataSecretApiKey: PINATA_SECRETkEY });
        const resPinata = await pinata.pinJSONToIPFS({encryptedData, iv});
        

        res.status(200).json({ipfsHash:resPinata.IpfsHash ,message:"Image Uploaded"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports={uploadImageController}