require('dotenv').config();
const express = require('express');

const characterRoute = require('./app/characters');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Up and running... here the swagger endpoint'));

app.use('/characters', characterRoute);

app.use((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT}`);
})
