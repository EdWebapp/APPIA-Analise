const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { buscarJogadores, buscarClubes } = require('./footballAPI');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS que estão na raiz)
app.use(express.static(__dirname));

// Rotas de páginas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/pag2', (req, res) => {
  res.sendFile(path.join(__dirname, 'pag2.html'));
});

app.get('/pag3', (req, res) => {
  res.sendFile(path.join(__dirname, 'pag3.html'));
});

// Rotas da API
app.get('/jogadores', async (req, res) => {
  const { timeId } = req.query;
  if (!timeId) {
    return res.status(400).json({ erro: 'Informe o timeId na URL, ex: ?timeId=33' });
  }

  const jogadores = await buscarJogadores(timeId);
  res.json(jogadores);
});

app.get('/clubes', async (req, res) => {
  const clubes = await buscarClubes();
  res.json(clubes);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(Servidor rodando em http://localhost:${PORT});
});



