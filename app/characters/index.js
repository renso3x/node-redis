const express = require('express');
const middleware = require('./middleware');
const controller = require('./controller');

const router = express.Router();

router.get('/', middleware.cachedData, async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const charById = await controller.getAllCharacters(limit, offset);
    res.send(charById);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:characterId',
  middleware.isValidId,
  middleware.cachedCharacter,
  async (req, res) => {
    try {
      const character = await controller.findById(req.params.characterId);
      return res.send(character);
    } catch (e) {
      res.status(404).send('Not Found');
    }
  }
)

module.exports = router;