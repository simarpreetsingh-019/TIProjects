const express = require("express");
const router = express.Router();
const {getImageController}= require('../controllers/getImageController');
const { authenticateToken } = require('../middleware/authenticateToken');

router.post("/getImage",authenticateToken,getImageController);

module.exports=router;