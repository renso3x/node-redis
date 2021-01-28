const express = require('express');
const _ = require('lodash');

const { fetchAllCharacters, fetchById } = require('./services');

var router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await fetchAllCharacters();
    const { data } = await response.json();
    const charById = _.map(data.results, 'id');
    return res.send(charById);
  } catch (e) {
    return res.status(500).send('Error', e);
  }
});

router.get('/:characterId', async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await fetchById(characterId);
    const { data } = await response.json();
    const character = _.pick(data.results[0], ['id', 'name', 'description'])
    return res.send(character);
  } catch (e) {
    return res.status(500).send('Error', e);
  }
})

module.exports = router;