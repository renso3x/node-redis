require('dotenv').config();
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const characterRoute = require('./app/characters');
const swaggerDoc = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

const specs = swaggerJsdoc(swaggerDoc);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use('/characters', characterRoute);

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT}`);
})

module.exports = app;