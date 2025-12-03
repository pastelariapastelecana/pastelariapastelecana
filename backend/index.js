require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const deliveryRoutes = require('./src/routes/deliveryRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const webhookRoutes = require('./src/routes/webhookRoutes'); // Importar as novas rotas de webhook

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Habilita CORS para todas as origens
app.use(bodyParser.json()); // Analisa corpos de requisição JSON

// Rotas
app.use('/api/delivery', deliveryRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);
app.use('/api/webhooks', webhookRoutes); // Adicionar as novas rotas de webhook
console.log('Rotas de pagamento, pedido e webhooks carregadas em /api'); // Adicionado para depuração

// Rota básica para testar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Inicia o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});
