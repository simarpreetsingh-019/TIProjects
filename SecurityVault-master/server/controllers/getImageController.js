const axios = require('axios');
const UserModel = require('../models/User');
const {decryptData}=require('../utils/decryption');
const PINATA_GATEWAY_URL="https://gateway.pinata.cloud/ipfs/"

async function returnIpfsResponse(ipfsHash){
    const res = await axios(`${PINATA_GATEWAY_URL}${ipfsHash}`);
    return res.data;
}

async function getImageController(req,res,next){
    try {
        const address = req.address;
        const userAddress=address.toLowerCase()
        const user=await UserModel.findOne({userAddress:userAddress});

        if(!user){
            throw new Error("User does not exist")
        }
        const {page,limit}=req.query;
    
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 1;

        if(pageNumber<1 || limitNumber<1){
            throw new Error("Pagination issue");
        }
        const startIndex=(pageNumber-1)*limitNumber
        const endIndex=pageNumber*limitNumber;
        
        const ipfsHashArray=req.body.slice(startIndex,Math.min(req.body.length,endIndex));

        const depcryptedImageArr=[];

        if(ipfsHashArray.length!==0){
            const encryptedDataArr = await Promise.all(ipfsHashArray.map(async(ipfsHash)=>{
                const res= await returnIpfsResponse(ipfsHash);
                return res;
            }));

            for (const img of encryptedDataArr) {
                try {
                    const decryptedImgData = decryptData(img.encryptedData, img.iv, user.encryptionKey);
            
                    if (decryptedImgData) { // Ensure decryptedImgData is not undefined
                        depcryptedImageArr.push(decryptedImgData.toString('base64'));
                    } else {
                        console.error('Decryption returned undefined for:', img, 'error', error.message);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        // console.log(depcryptedImageArr);
        res.status(200).json({message:"Image sent", depcryptedImageArr});
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports={getImageController}