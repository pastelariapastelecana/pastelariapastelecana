// backend/src/services/mercadoPagoService.js
const { MercadoPagoConfig, Payment } = require('mercadopago');

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
if (!accessToken) {
    console.error('ERRO CRÍTICO: MERCADOPAGO_ACCESS_TOKEN não está configurado no backend.');
    throw new Error('MERCADOPAGO_ACCESS_TOKEN is not defined.');
}

const client = new MercadoPagoConfig({ accessToken });

/**
 * Cria um pagamento PIX usando a API do Mercado Pago.
 * @param {number} amount - Valor total da transação.
 * @param {string} description - Descrição do pagamento.
 * @param {string} payerEmail - E-mail do pagador.
 * @param {string} payerName - Nome completo do pagador.
 * @param {string} externalReference - Referência externa do pedido.
 * @returns {Promise<object>} Dados do pagamento PIX (QR Code, etc.).
 */
async function createPixPayment(amount, description, payerEmail, payerName, externalReference) {
    const payment = new Payment(client);

    // O Mercado Pago exige first_name e last_name
    const nameParts = payerName.split(' ');
    const firstName = nameParts[0] || 'Cliente';
    const lastName = nameParts.slice(1).join(' ') || 'Online';

    const body = {
        transaction_amount: parseFloat(amount.toFixed(2)),
        description: description,
        payment_method_id: 'pix',
        external_reference: externalReference,
        notification_url: `${process.env.BACKEND_URL}/api/webhooks/mercadopago`,
        payer: {
            email: payerEmail,
            first_name: firstName,
            last_name: lastName,
            // O Mercado Pago pode exigir um tipo de identificação para PIX, dependendo do país.
            // Para o Brasil, geralmente é necessário CPF/CNPJ. Vamos assumir que não é estritamente obrigatório
            // para a criação inicial, mas se o erro persistir, o CPF/CNPJ deve ser adicionado ao formulário.
        },
    };

    try {
        const result = await payment.create({ body });
        return result;
    } catch (error) {
        console.error('Erro ao criar pagamento PIX no Mercado Pago:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Cria um pagamento com cartão de crédito/débito usando a API do Mercado Pago.
 * @param {object} paymentData - Dados do pagamento (token, valor, parcelas, etc.).
 * @returns {Promise<object>} Dados do pagamento criado.
 */
async function createCardPayment(paymentData) {
    const payment = new Payment(client);

    const body = {
        ...paymentData,
        notification_url: `${process.env.BACKEND_URL}/api/webhooks/mercadopago`,
    };

    try {
        const result = await payment.create({ body });
        return result;
    } catch (error) {
        console.error('Erro ao criar pagamento com Cartão no Mercado Pago:', error.response ? error.response.data : error.message);
        throw error;
    }
}

/**
 * Busca os detalhes de um pagamento.
 * @param {string} paymentId - ID do pagamento.
 * @returns {Promise<object | null>} Detalhes do pagamento.
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
