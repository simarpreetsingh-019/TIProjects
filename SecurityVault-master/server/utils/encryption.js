const crypto = require('crypto');

const encryptFile = (fileBuffer, passphrase) => {
  // Ensure the encryption key is 32 bytes long for AES-256-CBC
  const hash = crypto.createHash('sha256');
  hash.update(passphrase);
  const encryptionKey = hash.digest(); // This will be a 32-byte buffer

  // Generate a random initialization vector
  const iv = crypto.randomBytes(16);
  
  // Create a cipher object with AES-256-CBC algorithm and the provided encryption key and IV
  const algo = 'aes-256-cbc';
  const cipher = crypto.createCipheriv(algo, encryptionKey, iv);
  
  // Encrypt the file data
  const encryptedData = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  
  // Return the encrypted data and initialization vector
  return { encryptedData, iv };
};

module.exports = {
  encryptFile,
};