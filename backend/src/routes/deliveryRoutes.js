// backend/src/routes/deliveryRoutes.js
const express = require('express');
const router = express.Router();
const { getDeliveryFee } = require('../controllers/deliveryController');

router.post('/calculate-fee', getDeliveryFee);

module.exports = router;