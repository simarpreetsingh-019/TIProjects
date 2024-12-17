// routes/upload.js
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload endpoint
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    // Process the file (e.g., send it to another service, save to a database, etc.)
    // For now, just send a response back.
    res.status(200).send('File uploaded successfully');
});

module.exports = router;
