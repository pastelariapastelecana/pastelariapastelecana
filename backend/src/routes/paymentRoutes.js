// backend/src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');
// As funções generatePix e processTransparentCardPayment foram removidas do controlador,
// então suas rotas correspondentes também são removidas aqui.

router.post('/create-payment', processPayment);
// router.post('/generate-pix', generatePix); // Removido
// router.post('/process-transparent-card-payment', processTransparentCardPayment); // Removido

module.exports = router;