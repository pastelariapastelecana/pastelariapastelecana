const { getPaymentDetails } = require('../services/mercadoPagoService');
// Removido: const { sendOrderConfirmationEmail } = require('../services/emailService');

async function handleMercadoPagoWebhook(req, res) {
    const notificationType = req.body.type;
    const paymentId = req.body.data?.id;

    if (!paymentId || !notificationType) {
        console.warn('Webhook recebido sem paymentId ou notificationType:', req.body);
        return res.status(400).send('paymentId e notificationType são obrigatórios.');
    }

    console.log(`[Webhook] Recebido evento do Mercado Pago: Payment ID=${paymentId}, Tipo=${notificationType}`);

    try {
        if (notificationType === 'payment') {
            const paymentDetails = await getPaymentDetails(paymentId);

            if (!paymentDetails) {
                console.warn(`[Webhook] Detalhes do pagamento não encontrados para ID: ${paymentId}. Ignorando notificação.`);
                return res.status(200).send('Payment not found, notification ignored.');
            }

            console.log(`[Webhook] Status do pagamento para ID ${paymentId}: ${paymentDetails.status}`);

            if (paymentDetails.status === 'approved') {
                // APROVADO VIA WEBHOOK.
                // NÃO ENVIAMOS O EMAIL AQUI, POIS NÃO TEMOS OS DETALHES DE ENTREGA.
                // O FRONTEND É RESPONSÁVEL POR ENVIAR O PEDIDO COMPLETO APÓS O REDIRECIONAMENTO.
                console.log(`[Webhook] Pagamento ID ${paymentId} aprovado. Aguardando confirmação detalhada do frontend.`);
            } else {
                console.log(`[Webhook] Pagamento ID ${paymentId} não aprovado. Status: ${paymentDetails.status}`);
            }
        } else {
            console.log(`[Webhook] Tópico ${notificationType} não é um evento de pagamento. Ignorando.`);
        }

        res.status(200).send('Webhook processado com sucesso.');
    } catch (error) {
        console.error(`[Webhook] Erro inesperado ao processar webhook para ID ${paymentId}:`, error.message);
        res.status(500).send('Erro interno ao processar webhook.');
    }
}

module.exports = { handleMercadoPagoWebhook };
