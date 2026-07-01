require('dotenv').config();

const express = require('express');
const cors = require('cors');

const produtosRoutes = require('./routes/produtos.routes');
const reservasRoutes = require('./routes/reservas.routes');
const loginRoutes = require('./routes/login.routes');

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ERROR_MESSAGE = 'Origem não permitida pelo CORS.';

const frontendUrl = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.replace(/\/$/, '')
  : null;

const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  frontendUrl
].filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  const normalizedOrigin = origin.replace(/\/$/, '');

  if (allowedOrigins.includes(normalizedOrigin)) {
    return true;
  }

  try {
    const url = new URL(normalizedOrigin);
    return url.protocol === 'https:' && url.hostname.endsWith('.vercel.app');
  } catch (error) {
    return false;
  }
}

app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(CORS_ERROR_MESSAGE));
  }
}));

app.use(express.json());

app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'online',
    mensagem: 'API Luz & Aroma funcionando corretamente.'
  });
});

app.use('/api/produtos', produtosRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/login', loginRoutes);

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada.'
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.message === CORS_ERROR_MESSAGE ? 403 : 500;

  res.status(statusCode).json({
    erro: err.message || 'Erro interno do servidor.'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Luz & Aroma rodando na porta ${PORT}`);
});
