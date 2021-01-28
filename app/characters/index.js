const express = require('express');
const _ = require('lodash');
const services = require('./services');
const middleware = require('./middleware');
var router = express.Router();

const { fetchAllCharacters, fetchById } = services();

router.get('/', async (req, res) => {
  try {
    const response = await fetchAllCharacters();
    const { data } = await response.json();
    const charById = _.map(data.results, 'id');
    return res.send(charById);
  } catch (e) {
    return res.status(500).json({
      message: `Error ${e}`
    })
  }
});

router.get('/:characterId', middleware.isValidId, async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await fetchById(characterId);
    const { data } = await response.json();
    const character = _.pick(data.results[0], ['id', 'name', 'description'])
    return res.send(character);
  } catch (e) {
    return res.status(404).json({
      message: 'Not Found'
    })
  }
})

module.exports = router;