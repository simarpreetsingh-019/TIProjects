const express = require("express");
const router = express.Router();
const {authController}= require('../controllers/authController');

router.post("/authentication",authController);

module.exports=router;