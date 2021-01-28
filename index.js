require('dotenv').config();
const express = require('express');

const characterRoute = require('./app/characters');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/characters', characterRoute);

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT}`);
})
