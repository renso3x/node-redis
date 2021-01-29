const _ = require('lodash');
const services = require('./services');
const client = require('../lib/redis-client');

const { fetchAllCharacters, fetchById } = services();

module.exports = {
  getAllCharacters: async (limit, offset) => {
    const response = await fetchAllCharacters(limit, offset);
    const { data } = await response.json();
    const charById = _.map(data.results, 'id');
    client.setex(`page:${offset}`, 5 * 60, JSON.stringify(charById));
    return charById;
  },
  findById: async (characterId) => {
    const response = await fetchById(characterId);
    const { data } = await response.json();
    const character = _.pick(data.results[0], ['id', 'name', 'description']);
    client.setex(characterId, 5 * 60, JSON.stringify(character));
    return character;
  }
}