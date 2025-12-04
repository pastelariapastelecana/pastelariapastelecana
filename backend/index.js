require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const deliveryRoutes = require('./src/routes/deliveryRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const pixRoutes = require('./src/routes/pixRoutes'); // Adicionar rota PIX

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Habilita CORS para todas as origens
app.use(bodyParser.json()); // Analisa corpos de requisição JSON

// Rotas
app.use('/api/delivery', deliveryRoutes);
app.use('/api', orderRoutes);
app.use('/api/pix', pixRoutes); // Adicionar rota PIX
console.log('Rotas de entrega, pedido e PIX carregadas em /api'); // Atualizado para depuração

// Rota básica para testar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Inicia o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});
