const crypto = require("crypto");

const generateEncryptionKey = (length) => {
    if (length !== 32) {
        throw new Error('Invalid key length, expected 32 bytes for aes-256-cbc');
    }
    return crypto.randomBytes(length/2).toString('hex');
};

module.exports ={generateEncryptionKey};