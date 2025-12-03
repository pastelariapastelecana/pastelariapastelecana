const { MercadoPagoConfig, Payment } = require('mercadopago');

// Garante que accessToken esteja disponível antes de inicializar o cliente
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
if (!accessToken) {
    console.error('ERRO CRÍTICO: MERCADOPAGO_ACCESS_TOKEN não está configurado no arquivo .env do backend para o serviço PIX.');
    throw new Error('MERCADOPAGO_ACCESS_TOKEN is not defined for PIX service.');
}

// Inicializa o cliente MercadoPago uma única vez ao carregar o módulo
const client = new MercadoPagoConfig({ accessToken });

async function generatePixData(amount, description, payerEmail, payerName) {
    // Verifica se o cliente foi inicializado corretamente
    if (!client) {
        throw new Error('MercadoPago client not initialized for PIX service.');
    }
    const payment = new Payment(client);

    // Dividir o nome completo em primeiro nome e sobrenome
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
            last_name: lastName, // Adicionado last_name
            // Opcional: Adicionar identificação se necessário para o país
            // identification: {
            //     type: "CPF",
            //     number: "12345678909"
            // }
        },
    };

    try {
        const result = await payment.create({ body });

        if (result && result.point_of_interaction && result.point_of_interaction.transaction_data) {
            return {
                qrCodeImage: `data:image/png;base64,${result.point_of_interaction.transaction_data.qr_code_base64}`,
                pixCopyPaste: result.point_of_interaction.transaction_data.qr_code,
            };
        } else {
            console.error('Mercado Pago PIX response missing transaction_data:', result);
            throw new Error('Dados do PIX QR Code não encontrados na resposta do Mercado Pago.');
        }
    } catch (error) {
        console.error('Erro ao gerar dados PIX no Mercado Pago:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = { generatePixData };