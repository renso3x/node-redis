const fetch = require('node-fetch');
const md5 = require('md5');
const config = require('../config');

module.exports = () => {

const MARVEL_HASH_KEY = md5(`${config.ts}${config.MARVEL_PRIVATE_KEY}${config.MARVEL_API_KEY}`);
const MARVEL_PARAMS = `ts=${config.ts}&apikey=${config.MARVEL_API_KEY}&hash=${MARVEL_HASH_KEY}`;

  return {
    fetchAllCharacters: () => {
      return fetch(`${config.MARVEL_ENDPOINT}/characters?${MARVEL_PARAMS}`);
    },
    fetchById: (characterId) => {
      return fetch(`${config.MARVEL_ENDPOINT}/characters/${characterId}?${MARVEL_PARAMS}`);
    }
  };
};