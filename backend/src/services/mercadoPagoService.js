// backend/src/services/mercadoPagoService.js
const { MercadoPagoConfig, Payment } = require('mercadopago');

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

if (!accessToken) {
    console.error('ERRO CRÍTICO: MERCADOPAGO_ACCESS_TOKEN não está configurado no backend.');
    // Lançar erro aqui pode quebrar o servidor na inicialização, mas é melhor para depuração.
    // Vamos apenas logar e deixar o erro de inicialização do cliente MP acontecer se o token for undefined.
}

const client = new MercadoPagoConfig({ accessToken });

/**
 * Cria um pagamento PIX usando o Checkout Transparente.
 */
async function createPixPayment(amount, description, payerEmail, payerName) {
    const payment = new Payment(client);

    const nameParts = payerName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const body = {
        transaction_amount: parseFloat(amount.toFixed(2)),
        description: description,
        payment_method_id: 'pix',
        payer: {
            email: payerEmail,
            first_name: firstName,
            last_name: lastName,
        },
    };

    try {
        const result = await payment.create({ body });
        
        if (result && result.point_of_interaction && result.point_of_interaction.transaction_data) {
            return {
                id: result.id,
                qrCodeImage: `data:image/png;base64,${result.point_of_interaction.transaction_data.qr_code_base64}`,
                pixCopyPaste: result.point_of_interaction.transaction_data.qr_code,
            };
        } else {
            console.error('Mercado Pago PIX response missing transaction_data:', result);
            throw new Error('Dados do PIX QR Code não encontrados na resposta do Mercado Pago.');
        }
    } catch (error) {
        console.error('Erro ao criar pagamento PIX no Mercado Pago:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Cria um pagamento com cartão usando o token (Checkout Transparente).
 */
async function createCardPayment(amount, description, token, installments, paymentMethodId, payerEmail, payerName) {
    const payment = new Payment(client);

    const nameParts = payerName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const body = {
        transaction_amount: parseFloat(amount.toFixed(2)),
        token: token,
        description: description,
        installments: installments,
        payment_method_id: paymentMethodId,
        payer: {
            email: payerEmail,
            first_name: firstName,
            last_name: lastName,
        },
    };

    try {
        const result = await payment.create({ body });
        return result;
    } catch (error) {
        console.error('Erro ao criar pagamento com cartão no Mercado Pago:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Busca detalhes de pagamento (usada pelo webhook)
 */
async function getPaymentDetails(paymentId) {
    const payment = new Payment(client);
    try {
        const result = await payment.get({ id: paymentId });
        return result;
    } catch (error) {
        console.warn(`[MercadoPagoService] Pagamento ${paymentId} não encontrado ou erro ao buscar detalhes:`, error.message);
        return null; 
    }
}

module.exports = { createPixPayment, createCardPayment, getPaymentDetails };
