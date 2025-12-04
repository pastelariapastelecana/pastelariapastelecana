// backend/src/controllers/paymentController.js
const { createPixPayment, createCardPayment } = require('../services/mercadoPagoService');

function extractErrorDetails(error) {
    if (error.response && error.response.data) {
        // Tenta extrair a mensagem de erro específica do Mercado Pago
        const mpError = error.response.data;
        if (mpError.message) return mpError.message;
        if (mpError.cause && mpError.cause.length > 0) {
            return mpError.cause.map(c => `${c.code}: ${c.description}`).join('; ');
        }
        return JSON.stringify(mpError);
    }
    return error.message;
}

async function processPixPayment(req, res) {
    try {
        const { amount, payerEmail, payerName, externalReference } = req.body;
        const description = 'Pagamento do pedido na Pastelaria Pastel & Cana';

        if (!amount || !payerEmail || !payerName || !externalReference) {
            return res.status(400).json({ error: 'Dados de pagamento incompletos.' });
        }

        const pixData = await createPixPayment(amount, description, payerEmail, payerName, externalReference);
        
        if (pixData && pixData.point_of_interaction && pixData.point_of_interaction.transaction_data) {
            res.json({
                paymentId: pixData.id,
                status: pixData.status,
                qrCodeImage: `data:image/png;base64,${pixData.point_of_interaction.transaction_data.qr_code_base64}`,
                pixCopyPaste: pixData.point_of_interaction.transaction_data.qr_code,
            });
        } else {
            throw new Error('Resposta do Mercado Pago PIX incompleta.');
        }

    } catch (error) {
        const details = extractErrorDetails(error);
        console.error('Erro ao processar pagamento PIX:', details);
        res.status(500).json({ error: 'Erro ao processar pagamento PIX.', details: details });
    }
}

async function processCardPayment(req, res) {
    try {
        const paymentData = req.body;
        
        // Adiciona dados obrigatórios que o frontend pode não ter enviado
        paymentData.description = 'Pagamento do pedido na Pastelaria Pastel & Cana';
        paymentData.installments = paymentData.installments || 1;
        paymentData.external_reference = paymentData.externalReference;
        
        if (!paymentData.transaction_amount || !paymentData.token || !paymentData.payment_method_id || !paymentData.payer || !paymentData.external_reference) {
             return res.status(400).json({ error: 'Dados de pagamento com cartão incompletos.' });
        }

        const cardData = await createCardPayment(paymentData);
        
        res.json({
            paymentId: cardData.id,
            status: cardData.status,
            statusDetail: cardData.status_detail,
        });

    } catch (error) {
        const details = extractErrorDetails(error);
        console.error('Erro ao processar pagamento com Cartão:', details);
        res.status(500).json({ error: 'Erro ao processar pagamento com Cartão.', details: details });
    }
}

module.exports = { processPixPayment, processCardPayment };
