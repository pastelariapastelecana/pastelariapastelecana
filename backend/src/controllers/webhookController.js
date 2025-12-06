const { getPaymentDetails } = require('../services/mercadoPagoService');
const { sendOrderConfirmationEmail } = require('../services/resendService');
const { getOrderDetailsByExternalId, updateOrderStatus } = require('../services/supabaseService'); // Importar serviço Supabase

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

            const externalOrderId = paymentDetails.external_reference;
            const paymentStatus = paymentDetails.status;

            console.log(`[Webhook] Status do pagamento para ID ${paymentId}: ${paymentStatus}. External Ref: ${externalOrderId}`);

            if (!externalOrderId) {
                console.warn(`[Webhook] Pagamento ID ${paymentId} não possui external_reference. Não é possível vincular ao pedido.`);
                return res.status(200).send('No external reference, notification ignored.');
            }

            // 1. Buscar detalhes do pedido no Supabase
            const orderDetails = await getOrderDetailsByExternalId(externalOrderId);

            if (!orderDetails) {
                console.error(`[Webhook] Pedido não encontrado no Supabase para External ID: ${externalOrderId}.`);
                // Continua, mas não envia e-mail
                return res.status(200).send('Order not found in DB, notification processed.');
            }

            // 2. Atualizar status do pedido no Supabase
            await updateOrderStatus(externalOrderId, paymentStatus, paymentId);

            if (paymentStatus === 'approved') {
                // 3. APROVADO VIA WEBHOOK: Enviar e-mail de confirmação
                console.log(`[Webhook] Pagamento ID ${paymentId} aprovado. Enviando e-mail de confirmação.`);
                
                // Reestrutura os dados do pedido para o formato esperado pelo resendService
                const emailOrderDetails = {
                    items: orderDetails.items,
                    deliveryDetails: orderDetails.delivery_details,
                    deliveryFee: orderDetails.delivery_fee,
                    totalPrice: orderDetails.total_price,
                    totalWithDelivery: orderDetails.total_with_delivery,
                    paymentMethod: orderDetails.payment_method,
                    payerName: orderDetails.payer_name,
                    payerEmail: orderDetails.payer_email,
                    orderDate: orderDetails.order_date,
                    paymentId: paymentId,
                    orderId: externalOrderId,
                };

                await sendOrderConfirmationEmail(emailOrderDetails);
                
            } else {
                console.log(`[Webhook] Pagamento ID ${paymentId} não aprovado. Status: ${paymentStatus}. E-mail não enviado.`);
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
