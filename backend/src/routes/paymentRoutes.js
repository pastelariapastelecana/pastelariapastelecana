// backend/src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { processPixPayment, processCardPayment } = require('../controllers/paymentController');

router.post('/process-pix', processPixPayment);
router.post('/process-card', processCardPayment);

module.exports = router;
