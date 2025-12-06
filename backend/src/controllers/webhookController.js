const { getPaymentDetails } = require('../services/mercadoPagoService');
const { updateOrderStatus } = require('../services/supabaseService'); // Importar serviço Supabase

async function handleMercadoPagoWebhook(req, res) {
    // O Mercado Pago envia o ID do recurso (payment, preapproval, etc.) no campo 'data.id'
    const notificationType = req.body.type;
    const resourceId = req.body.data?.id; // Este é o ID do pagamento (paymentId)

    if (!resourceId || !notificationType) {
        console.warn('Webhook recebido sem resourceId ou notificationType:', req.body);
        return res.status(400).send('resourceId e notificationType são obrigatórios.');
    }

    console.log(`[Webhook] Recebido evento do Mercado Pago: Resource ID=${resourceId}, Tipo=${notificationType}`);

    try {
        if (notificationType === 'payment') {
            const paymentDetails = await getPaymentDetails(resourceId);

            if (!paymentDetails) {
                console.warn(`[Webhook] Detalhes do pagamento não encontrados para ID: ${resourceId}. Ignorando notificação.`);
                return res.status(200).send('Payment not found, notification ignored.');
            }

            const paymentStatus = paymentDetails.status;
            const externalOrderId = paymentDetails.external_reference; // O ID do pedido que definimos

            console.log(`[Webhook] Status do pagamento para ID ${resourceId}: ${paymentStatus}. External Ref: ${externalOrderId}`);

            if (externalOrderId) {
                // Atualiza o status do pedido no Supabase
                await updateOrderStatus(externalOrderId, paymentStatus, resourceId);
            }

            if (paymentStatus === 'approved') {
                // APROVADO VIA WEBHOOK.
                // O frontend ainda é responsável por enviar o pedido completo (com detalhes de entrega)
                // após o redirecionamento, mas o status no DB já está correto.
                console.log(`[Webhook] Pagamento ID ${resourceId} aprovado. Status atualizado no DB.`);
            } else {
                console.log(`[Webhook] Pagamento ID ${resourceId} não aprovado. Status: ${paymentStatus}. Status atualizado no DB.`);
            }
        } else {
            console.log(`[Webhook] Tópico ${notificationType} não é um evento de pagamento. Ignorando.`);
        }

        res.status(200).send('Webhook processado com sucesso.');
    } catch (error) {
        console.error(`[Webhook] Erro inesperado ao processar webhook para ID ${resourceId}:`, error.message);
        res.status(500).send('Erro interno ao processar webhook.');
    }
}

module.exports = { handleMercadoPagoWebhook };
