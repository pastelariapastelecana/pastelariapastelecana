const { generatePixData } = require('../services/pixService');

async function generatePix(req, res) {
    try {
        const { amount, description, payerEmail, payerName } = req.body; // Recebe nome e e-mail
        if (!amount || !description || !payerEmail || !payerName) {
            return res.status(400).json({ error: 'Valor, descrição, nome e e-mail do pagador são obrigatórios para gerar o PIX.' });
        }
        const pixData = await generatePixData(amount, description, payerEmail, payerName); // Passa para o serviço
        res.json(pixData);
    } catch (error) {
        console.error('Erro ao gerar dados PIX:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Erro interno ao gerar dados PIX.', details: error.response ? error.response.data : error.message });
    }
}

module.exports = { generatePix };