// backend/src/controllers/orderController.js
// const { sendOrderConfirmationEmail } = require('../services/resendService'); // Removido

async function confirmOrder(req, res) {
    try {
        const orderDetails = req.body;
        console.log('Pedido confirmado recebido no backend (após pagamento):', orderDetails.external_order_id);

        // NOTA: O envio de e-mail foi movido para o webhookController.js
        // Esta rota agora serve apenas para registro/processamento inicial se necessário.

        res.status(200).json({ message: 'Pedido recebido com sucesso. Aguardando confirmação final via webhook.' });
    } catch (error) {
        console.error('Erro ao confirmar pedido no backend:', error);
        res.status(500).json({ error: 'Erro ao confirmar pedido.', details: error.message });
    }
}

module.exports = { confirmOrder };
