const axios = require('axios');

const API_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

// Buscar clubes do Brasileirão
async function buscarClubes(temporada = 2023) {
  try {
    const response = await axios.get(`${BASE_URL}/teams`, {
      params: {
        league: 71,
        season: temporada
      },
      headers: {
        'x-apisports-key': API_KEY
      }
    });

    return response.data.response;
  } catch (error) {
    console.error('Erro ao buscar clubes:', error.message);
    return [];
  }
}

//Buscar jogadores de um clube
async function buscarJogadores(timeId, temporada = 2023) {
  try {
    const response = await axios.get(`${BASE_URL}/players`, {
      params: {
        team: timeId,
        season: temporada
      },
      headers: {
        'x-apisports-key': API_KEY
      }
    });

    return response.data.response;
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error.message);
    return [];
  }
}

module.exports = {
  buscarClubes,
  buscarJogadores 
};