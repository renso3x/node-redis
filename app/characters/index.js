const express = require('express');
const _ = require('lodash');
const services = require('./services');
const middleware = require('./middleware');
const client = require('../lib/redis-client');

const router = express.Router();
const { fetchAllCharacters, fetchById } = services();

router.get('/', middleware.cachedData, async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const response = await fetchAllCharacters(limit, offset);
    const { data } = await response.json();
    const charById = _.map(data.results, 'id');
    client.setex(`page:${offset}`, 5 * 60, JSON.stringify(charById));
    res.send(charById);
  } catch (e) {
    return res.status(500).json({
      message: `Error ${e}`
    })
  }
});

router.get('/:characterId',
  middleware.isValidId,
  middleware.cachedCharacter,
  async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await fetchById(characterId);
    const { data } = await response.json();
    const character = _.pick(data.results[0], ['id', 'name', 'description'])
    client.setex(characterId, 5 * 60, JSON.stringify(character));
    return res.send(character);
  } catch (e) {
    return res.status(404).json({
      message: 'Not Found'
    })
  }
})

module.exports = router;