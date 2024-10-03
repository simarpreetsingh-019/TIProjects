const ethers = require('ethers');
const User=require('../models/User');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRETKEY } =require('../config/serverConfig');

async function authController (req, res, next) {
    try {
        const { signature } = req.body;
        const { address } = req.query;

        if (!signature) {
            throw new Error("signature is invalid");
        }

        const recoveredAddress = ethers.utils.verifyMessage("Welcome to Anurag Kaushik Project",signature);
        if (address.toLowerCase() === recoveredAddress.toLowerCase() ){
            const address = recoveredAddress.toLowerCase();
            const user = await UserModel.findOne({userAddress:address});
            if (!user) {
                const userData = await UserModel.create({userAddress:address});
                console.log(userData);
            }
            const token = jwt.sign({
                address
            }, JWT_SECRETKEY)
            res.status(200).json({message: "Authentication successfull", token});
        } else {
            res.status(400).json({message: "Authentication failed"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ messgae : "Internal error"});
    }
}
module.exports={authController};