// backend/src/controllers/cardPaymentController.js
const { createCardPayment } = require('../services/mercadoPagoService');

async function processCardPayment(req, res) {
    try {
        const { amount, description, token, installments, paymentMethodId, payerEmail, payerName } = req.body;

        if (!amount || !token || !paymentMethodId || !payerEmail || !payerName) {
            return res.status(400).json({ error: 'Dados de pagamento incompletos.' });
        }

        const paymentResult = await createCardPayment(
            amount,
            description,
            token,
            installments,
            paymentMethodId,
            payerEmail,
            payerName
        );

        // Retorna o status e o ID do pagamento
        res.json({ 
            status: paymentResult.status, 
            id: paymentResult.id,
            status_detail: paymentResult.status_detail 
        });

    } catch (error) {
        console.error('Erro ao processar pagamento com cartão:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: 'Erro ao processar pagamento com cartão.', 
            details: error.response ? error.response.data : error.message 
        });
    }
}

module.exports = { processCardPayment };
