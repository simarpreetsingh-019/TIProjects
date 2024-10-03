require('dotenv').config();

module.exports={
    MONGODB_URL:process.env.MONGODB_URL,
    PORT:process.env.PORT || 3000,
    JWT_SECRETKEY:process.env.JWT_SECRETKEY,
    PINATA_APIKEY:process.env.PINATA_APIKEY,
    PINATA_SECRETkEY:process.env.PINATA_SECRETkEY
}
