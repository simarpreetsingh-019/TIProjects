const multer = require('multer');

const storage = () => multer.memoryStorage();

module.exports = { uploadUserImage:multer( {storage : storage()} ).single('file') };
