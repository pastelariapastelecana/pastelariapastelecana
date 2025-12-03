const express = require('express');
const router = express.Router();
const { handleMercadoPagoWebhook } = require('../controllers/webhookController');

router.post('/mercadopago', handleMercadoPagoWebhook);

module.exports = router;