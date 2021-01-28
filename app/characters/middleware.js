const Joi = require('joi');

module.exports = {
  isValidId: (req, res, next) => {
    const schema = Joi.object().keys({
      characterId: Joi.number().required()
    });

    const { error, value } = schema.validate(req.params)
    if (error) {
      return res.json({ message: `Error ${error}` });
    }
    next();
  }
}