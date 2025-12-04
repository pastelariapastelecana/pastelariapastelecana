// backend/src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { processPixPayment, processCardPayment } = require('../controllers/paymentController');

// Rota para iniciar o pagamento com cartão (Checkout Transparente)
router.post('/process-card-payment', processCardPayment);

// Rota para gerar o PIX (Checkout Transparente)
router.post('/process-pix-payment', processPixPayment);

module.exports = router;
