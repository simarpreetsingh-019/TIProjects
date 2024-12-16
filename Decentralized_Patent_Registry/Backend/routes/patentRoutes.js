// routes/patentRoutes.js

const express = require('express');
const router = express.Router();
const { registerPatent, transferPatent, getPatentDetails } = require('../controllers/patentController');

router.post('/register', registerPatent);
router.post('/transfer', transferPatent);
router.get('/patentDetails/:patentId', getPatentDetails);

module.exports = router;