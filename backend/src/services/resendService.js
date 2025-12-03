const { Resend } = require('resend');

const resendApiKey = process.env.RESEND_API_KEY;
const orderRecipientEmail = process.env.ORDER_RECIPIENT_EMAIL;
const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev'; // Use um domínio verificado ou o padrão do Resend

if (!resendApiKey || !orderRecipientEmail) {
    console.error('ERRO CRÍTICO: RESEND_API_KEY ou ORDER_RECIPIENT_EMAIL não estão configurados no backend.');
    throw new Error('Configuração do Resend incompleta.');
}

const resend = new Resend(resendApiKey);

async function sendOrderConfirmationEmail(orderDetails) {
    const { items, deliveryDetails, deliveryFee, totalPrice, totalWithDelivery, paymentMethod, payerName, payerEmail, orderDate, paymentId, orderId } = orderDetails;

    const itemDetails = items.map(item => `
        <li>${item.name} (x${item.quantity}) - R$ ${item.price.toFixed(2)} cada</li>
    `).join('');

    const emailContent = `
        <h1>Novo Pedido Recebido!</h1>
        <p>Um novo pedido foi finalizado com sucesso em ${new Date(orderDate).toLocaleString('pt-BR')}.</p>
        ${orderId ? `<p><strong>ID do Pedido Interno (External Reference):</strong> ${orderId}</p>` : ''}
        ${paymentId ? `<p><strong>ID do Pagamento (Mercado Pago):</strong> ${paymentId}</p>` : ''}
        
        <h2>Detalhes do Cliente:</h2>
        <p><strong>Nome:</strong> ${payerName}</p>
        <p><strong>E-mail:</strong> ${payerEmail}</p>

        <h2>Detalhes da Entrega:</h2>
        <p><strong>Endereço:</strong> ${deliveryDetails.address}, ${deliveryDetails.number}, ${deliveryDetails.neighborhood}, ${deliveryDetails.city} - ${deliveryDetails.zipCode}</p>
        <p><strong>Taxa de Entrega:</strong> R$ ${deliveryFee ? deliveryFee.toFixed(2) : '0.00'}</p>

        <h2>Itens do Pedido:</h2>
        <ul>
            ${itemDetails}
        </ul>

        <h2>Resumo do Pagamento:</h2>
        <p><strong>Subtotal dos Itens:</strong> R$ ${totalPrice.toFixed(2)}</p>
        <p><strong>Taxa de Entrega:</strong> R$ ${deliveryFee ? deliveryFee.toFixed(2) : '0.00'}</p>
        <p><strong>Total Geral:</strong> R$ ${totalWithDelivery.toFixed(2)}</p>
        <p><strong>Método de Pagamento:</strong> ${paymentMethod === 'pix' ? 'PIX' : 'Mercado Pago'}</p>

        <p>Por favor, prepare o pedido e organize a entrega.</p>
        <p>Atenciosamente,<br>Sua Pastelaria Pastel & Cana</p>
    `;

    const subject = `Novo Pedido Recebido - #${orderId ? orderId.substring(0, 8) : new Date(orderDate).getTime()} (MP ID: ${paymentId})`;

    try {
        const { data, error } = await resend.emails.send({
            from: senderEmail,
            to: [orderRecipientEmail],
            subject: subject,
            html: emailContent,
        });

        if (error) {
            console.error('Erro ao enviar e-mail com Resend:', error);
            throw new Error(`Falha ao enviar e-mail via Resend: ${error.message}`);
        }

        console.log('E-mail de confirmação de pedido enviado com sucesso via Resend!', data);
    } catch (error) {
        console.error('Erro ao enviar e-mail de confirmação de pedido (Resend):', error);
        throw new Error('Falha ao enviar e-mail de confirmação.');
    }
}

module.exports = { sendOrderConfirmationEmail };
