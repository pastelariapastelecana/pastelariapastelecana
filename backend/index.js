require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const deliveryRoutes = require('./src/routes/deliveryRoutes');
const pixRoutes = require('./src/routes/pixRoutes');
const cardPaymentRoutes = require('./src/routes/cardPaymentRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const webhookRoutes = require('./src/routes/webhookRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Habilita CORS para todas as origens
app.use(bodyParser.json()); // Analisa corpos de requisição JSON

// Rotas
app.use('/api/delivery', deliveryRoutes);
app.use('/api', pixRoutes);
app.use('/api', cardPaymentRoutes);
app.use('/api', orderRoutes);
app.use('/api/webhooks', webhookRoutes);
console.log('Rotas de PIX, Cartão, pedido e webhooks carregadas em /api');

// Rota básica para testar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Inicia o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});
