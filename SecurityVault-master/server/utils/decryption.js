const crypto = require('crypto');

const decryptData = (encryptedData, iv, encryptionKey) => {
    try {
        if (typeof iv === 'object' && iv.type === 'Buffer' && Array.isArray(iv.data)) {
            iv = Buffer.from(iv.data);
        }

        if (typeof encryptedData === 'object' && encryptedData.type === 'Buffer' && Array.isArray(encryptedData.data)) {
            encryptedData = Buffer.from(encryptedData.data);
        }

        // Ensure encryptionKey is 32 bytes. If not, hash it to get a 32-byte key
        let key = Buffer.from(encryptionKey);
        if (key.length !== 32) {
            const hash = crypto.createHash('sha256');
            hash.update(encryptionKey);
            key = hash.digest();
        }

        // Create a decipher object with the correct key length
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        return decryptedData;
    } catch (error) {
        console.log(error);
    }
};

module.exports={ decryptData };