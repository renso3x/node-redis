const express = require('express');
const middleware = require('./middleware');
const controller = require('./controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Character:
 *        type: object
 *        properties:
 *            id:
 *              type: integer
 *              example: 1009571
 *            name:
 *              type: string
 *              example: "Sentry (Robert Reynolds)"
 *            description:
 *              type: string
 *              example: "Empowered by the enigmatic Professor's secret formula, high school student Robert Reynolds became a superhuman."
 *     Characters:
 *        type: array
 *        items:
 *          type: integer
 *          example: [1009181, 1011262, 1009182, 1011224, 1009183, 1009184, 1017330, 1009185, 1010910, 1010859]
 */

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Retrieve a list of id of marvel characters.
 *     responses:
 *      200:
 *        description: successful operation
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/Characters'
 */

router.get('/', middleware.cachedData, async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const charById = await controller.getAllCharacters(limit, offset);
    res.send(charById);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /characters/{characterId}:
 *   get:
 *     summary: Find marvel character by ID
 *     operationId: characterId
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         description: Numeric ID of the marvel character to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Character'
 *       '404':
 *          description: Not found
 *       '500':
 *          description:  \"characterId\" must be a number
*/
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