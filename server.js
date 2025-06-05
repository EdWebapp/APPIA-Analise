const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { buscarJogadores, buscarClubes } = require('./footballAPI');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor de Futebol IA está rodando!');
});

app.get('/jogadores', async (req, res) => {
  const { timeId } = req.query;
  if (!timeId) {
    return res.status(400).json({ erro: 'Informe o timeId na URL, ex: ?timeId=33' });
  }

  const jogadores = await buscarJogadores(timeId);
  res.json(jogadores);
});

// Nova rota para buscar clubes do Brasileirão
app.get('/clubes', async (req, res) => {
  const clubes = await buscarClubes();
  res.json(clubes);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
