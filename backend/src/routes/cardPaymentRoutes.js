const express = require('express');
const router = express.Router();
const { processCardPayment } = require('../controllers/cardPaymentController');

router.post('/process-card-payment', processCardPayment);

module.exports = router;
