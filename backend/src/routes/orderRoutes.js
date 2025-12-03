const express = require('express');
const router = express.Router();
const { confirmOrder } = require('../controllers/orderController');

router.post('/confirm-order', confirmOrder);

module.exports = router;