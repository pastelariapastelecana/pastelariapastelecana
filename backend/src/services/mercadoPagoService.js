// backend/src/services/mercadoPagoService.js
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
if (!accessToken) {
    console.error('ERRO CRÍTICO: MERCADOPAGO_ACCESS_TOKEN não está configurado no arquivo .env do backend.');
    throw new Error('MERCADOPAGO_ACCESS_TOKEN is not defined.');
}

const client = new MercadoPagoConfig({ accessToken });

async function createPaymentPreference(items, payer, externalReference) {
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
        // Adiciona a referência externa para rastreamento
        external_reference: externalReference,
    };

    const result = await preference.create({ body });
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

module.exports = { createPaymentPreference, getPaymentDetails };
