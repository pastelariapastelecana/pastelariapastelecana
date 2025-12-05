// backend/src/services/pixService.js
// A lógica de criação de PIX foi movida para mercadoPagoService.js
const { createPixPayment } = require('./mercadoPagoService');

async function generatePixData(amount, description, payerEmail, payerName) {
    return createPixPayment(amount, description, payerEmail, payerName);
}

module.exports = { generatePixData };
