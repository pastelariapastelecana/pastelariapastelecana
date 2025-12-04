const { getPaymentDetails } = require('../services/mercadoPagoService');
const { sendOrderConfirmationEmail } = require('../services/resendService'); // Usar Resend

async function handleMercadoPagoWebhook(req, res) {
    const topic = req.query.topic || req.body.topic;
    const resourceId = req.query.id || req.body.data?.id;

    if (!resourceId || topic !== 'payment') {
        console.warn(`[Webhook] Recebido evento não processável. Tópico: ${topic}, ID: ${resourceId}`);
        return res.status(200).send('Evento ignorado.');
    }

    console.log(`[Webhook] Recebido evento do Mercado Pago: Tópico=${topic}, ID=${resourceId}`);

    try {
        const paymentDetails = await getPaymentDetails(resourceId);

        if (!paymentDetails) {
            console.warn(`[Webhook] Detalhes do pagamento não encontrados para ID: ${resourceId}. Ignorando notificação.`);
            return res.status(200).send('Payment not found, notification ignored.');
        }

        console.log(`[Webhook] Status do pagamento para ID ${resourceId}: ${paymentDetails.status}`);

        if (paymentDetails.status === 'approved') {
            // Pagamento APROVADO.
            // Aqui, você precisaria buscar os detalhes completos do pedido usando o external_reference
            // e enviar o e-mail de confirmação.
            
            // NOTA: Como não temos um banco de dados para pedidos, vamos apenas logar a aprovação.
            // O frontend ainda será responsável por enviar o pedido completo após a aprovação.
            
            console.log(`[Webhook] Pagamento ID ${resourceId} aprovado. External Reference: ${paymentDetails.external_reference}`);
            
            // Se o pedido já foi confirmado pelo frontend, este webhook é apenas uma confirmação.
            // Se o pedido ainda não foi confirmado (ex: PIX), o frontend deve buscar o status.
            
            // Para simplificar, vamos confiar que o frontend fará a confirmação final.
            // Se você quisesse enviar o e-mail aqui, precisaria de um DB para armazenar os detalhes do pedido.
            
        } else {
            console.log(`[Webhook] Pagamento ID ${resourceId} não aprovado. Status: ${paymentDetails.status}`);
        }

        res.status(200).send('Webhook processado com sucesso.');
    } catch (error) {
        console.error(`[Webhook] Erro inesperado ao processar webhook para ID ${resourceId}:`, error.message);
        res.status(500).send('Erro interno ao processar webhook.');
    }
}

module.exports = { handleMercadoPagoWebhook };
