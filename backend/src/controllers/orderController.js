// backend/src/controllers/orderController.js
const { sendOrderConfirmationEmail } = require('../services/resendService'); // Usar Resend

async function confirmOrder(req, res) {
    try {
        const orderDetails = req.body;
        console.log('Pedido confirmado recebido no backend:', orderDetails);

        // Enviar e-mail de confirmação para o lojista
        await sendOrderConfirmationEmail(orderDetails);

        res.status(200).json({ message: 'Pedido confirmado com sucesso e e-mail enviado!' });
    } catch (error) {
        console.error('Erro ao confirmar pedido no backend:', error);
        res.status(500).json({ error: 'Erro ao confirmar pedido.', details: error.message });
    }
}

module.exports = { confirmOrder };
