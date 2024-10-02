const express = require("express");
const router = express.Router();
const {uploadImageController}= require('../controllers/uploadImageController');
const { authenticateToken } = require('../middleware/authenticateToken');
const { uploadUserImage }= require("../middleware/multer");

router.post("/uploadImage",authenticateToken, uploadUserImage, uploadImageController);

module.exports=router;