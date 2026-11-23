import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  return res.json({ message: 'API Rachai no ar. Use /health para checar.' });
});

app.get('/health', (_req, res) => {
  return res.json({ status: 'ok', service: 'rachai-api' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});