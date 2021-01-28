const fetch = require('node-fetch');
const md5 = require('md5');

module.exports = () => {
  const MARVEL_ENDPOINT = `${process.env.MARVEL_ENDPOINT}/v1/public`;
  const ts = process.env.ts;
  const MARVEL_API_KEY = process.env.MARVEL_API_KEY;
  const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;
  const HASH_KEY = md5(`${ts}${MARVEL_PRIVATE_KEY}${MARVEL_API_KEY}`);
  const ENDPOINT_PARAMS = `ts=${ts}&apikey=${MARVEL_API_KEY}&hash=${HASH_KEY}`;

  return {
    fetchAllCharacters: () => {
      return fetch(`${MARVEL_ENDPOINT}/characters?${ENDPOINT_PARAMS}`);
    },
    fetchById: (characterId) => {
      return fetch(`${MARVEL_ENDPOINT}/characters/${characterId}?${ENDPOINT_PARAMS}`);
    }
  };
};