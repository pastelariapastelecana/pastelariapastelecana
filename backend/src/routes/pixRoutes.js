// backend/src/routes/pixRoutes.js
const express = require('express');
const router = express.Router();
const { generatePix } = require('../controllers/pixController');

router.post('/generate-pix', generatePix);

module.exports = router;
