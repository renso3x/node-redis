const Joi = require('joi');
const client = require('../lib/redis-client');

module.exports = {
  isValidId: (req, res, next) => {
    const schema = Joi.object().keys({
      characterId: Joi.number().required()
    });

    const { error, value } = schema.validate(req.params)
    if (error) {
      return res.status(500).json({ message: `Error ${error}` });
    }
    next();
  },
  cachedData: async (req, res, next) => {
    client.get(`page:${req.query.offset}`, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result != null) {
        return res.json(JSON.parse(result));
      }
      next();
    })
  },
  cachedCharacter: async (req, res, next) => {
    client.get(req.params.characterId, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result != null) {
        return res.json(JSON.parse(result));
      }
      next();
    })
  }
}