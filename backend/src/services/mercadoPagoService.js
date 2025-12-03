// backend/src/services/mercadoPagoService.js
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

async function createPaymentPreference(items, payer) {
    const preference = new Preference(client);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001'; // Usar BACKEND_URL

    const body = {
        items: items,
        payer: {
            name: payer.name,
            email: payer.email,
        },
        back_urls: {
            success: `${frontendUrl}/checkout?status=approved`,
            failure: `${frontendUrl}/checkout?status=rejected`,
            pending: `${frontendUrl}/checkout?status=pending`
        },
        auto_return: "approved",
        // Adiciona a URL de notificação para que o Mercado Pago envie o status do pagamento
        notification_url: `${backendUrl}/api/webhooks/mercadopago`,
    };

    const result = await preference.create({ body });
    return result;
}

async function createPixPayment(payerEmail, payerName, totalAmount) {
    const payment = new Payment(client);

    const body = {
        transaction_amount: parseFloat(totalAmount.toFixed(2)),
        description: 'Pagamento do pedido na Pastelaria Pastel & Cana',
        payment_method_id: 'pix',
        payer: {
            email: payerEmail,
            first_name: payerName,
        },
    };

    const result = await payment.create({ body });
    return result;
}

async function getPaymentDetails(paymentId) {
    const payment = new Payment(client);
    try {
        const result = await payment.get({ id: paymentId });
        return result;
    } catch (error) {
        // Se o pagamento não for encontrado (ex: erro 404), loga e retorna null
        console.warn(`[MercadoPagoService] Pagamento ${paymentId} não encontrado ou erro ao buscar detalhes:`, error.message);
        return null; 
    }
}

module.exports = { createPaymentPreference, createPixPayment, getPaymentDetails };
