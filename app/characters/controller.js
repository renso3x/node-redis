const _ = require('lodash');
const services = require('./services');
const config = require('../config')
const client = require('../lib/redis-client');

module.exports = {
  /**
   * controller for all marvel heroes route
   * @param {integer} limit
   * @param {integer} offset
   * @return {Promise}
   */
  getAllCharacters: async (limit, offset) => {
    const response = await services.fetchAllCharacters(limit, offset);
    const charById = _.map(response, 'id');
    client.setex(`page:${offset}-${limit}`, config.CACHE_POLICY, JSON.stringify(charById));
    return charById;
  },
  /**
   * controller for marvel hero id route
   * @param {integer} characterId
   * @return {Promise}
   */
  findById: async (characterId) => {
    const response = await services.fetchById(characterId);
    const character = _.pick(response, ['id', 'name', 'description']);
    client.setex(characterId, config.CACHE_POLICY, JSON.stringify(character));
    return character;
  }
}