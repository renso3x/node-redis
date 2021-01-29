const fetch = require('node-fetch');
const md5 = require('md5');
const config = require('../config');

const MARVEL_HASH_KEY = md5(`${config.ts}${config.MARVEL_PRIVATE_KEY}${config.MARVEL_API_KEY}`);
const MARVEL_PARAMS = `ts=${config.ts}&apikey=${config.MARVEL_API_KEY}&hash=${MARVEL_HASH_KEY}`;

const fetchAllCharacters = async (limit = 100, offset = 1) => {
  const response = await fetch(`${config.MARVEL_ENDPOINT}/characters?${MARVEL_PARAMS}&limit=${limit}&offset=${offset + limit}`);
  const { data } = await response.json();
  return data.results;
}

const fetchById = async (characterId) => {
  const response = await fetch(`${config.MARVEL_ENDPOINT}/characters/${characterId}?${MARVEL_PARAMS}`);
  const { data } = await response.json();
  return data.results[0];
}

module.exports = {
  fetchAllCharacters,
  fetchById
};