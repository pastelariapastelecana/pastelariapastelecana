"use strict";
// backend/src/controllers/deliveryController.js
const { calculateDistance } = require('../services/mapsService');

async function getDeliveryFee(req, res) {
    try {
        const { origin, destination } = req.body; // Ex: origin = "Endereço da loja", destination = "Endereço do cliente"
        console.log(`[Backend] Recebida requisição para calcular frete. Origem: "${origin}", Destino: "${destination}"`); // NEW LOG
        const distanceInKm = await calculateDistance(origin, destination);

        // Lógica de preço: Ex: R$ 5.00 base + R$ 2.00 por km
        const baseFee = 0.00;
        const feePerKm = 2.00;
        const deliveryFee = baseFee + (distanceInKm * feePerKm);

        res.json({ distanceInKm, deliveryFee: parseFloat(deliveryFee.toFixed(2)) });
    } catch (error) {
        console.error('[Backend] Erro ao calcular taxa de entrega no controller:', error.message); // Enhanced log
        res.status(500).json({ error: 'Erro ao calcular a taxa de entrega', details: error.message }); // Send error message to frontend
    }
}

module.exports = { getDeliveryFee };