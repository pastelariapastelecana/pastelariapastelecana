// backend/src/controllers/paymentController.js
const { createPaymentPreference } = require('../services/mercadoPagoService');

async function processPayment(req, res) {
    try {
        const { items, payer, externalReference } = req.body; // Recebe externalReference
        const preference = await createPaymentPreference(items, payer, externalReference); // Passa externalReference
        res.json({ id: preference.id, init_point: preference.init_point });
    } catch (error) {
        console.error('Erro ao criar preferência de pagamento:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Erro ao criar preferência de pagamento', details: error.response ? error.response.data : error.message });
    }
}

module.exports = { processPayment };
