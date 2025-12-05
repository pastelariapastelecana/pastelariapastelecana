// backend/src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');
const { generatePix } = require('../controllers/pixController'); // Importar o controlador PIX

router.post('/create-payment', processPayment);
router.post('/generate-pix', generatePix); // Rota para gerar PIX Transparente

module.exports = router;
