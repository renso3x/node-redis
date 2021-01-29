require('dotenv').config();
const express = require('express');

const characterRoute = require('./app/characters');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Up and running... here the swagger endpoint'));

app.use('/characters', characterRoute);

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT}`);
})
