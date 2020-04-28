const socket = require('socket.io');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const io = require('socket.io')(server);

app.use(express.json());
app.use(express.static(`${__dirname}/../client/dist`));

io.sockets.on('connection', socket);

app.get('/api/restaurants', cors(), (req, res) => {
  const apiURL = 'https://code-challenge.spectrumtoolbox.com/api/restaurants';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Api-Key ${process.env.VALUE}`,
  };

  fetch(apiURL, { method: 'GET', headers })
    .then(res => res.json())
    .then(data => {
      res.status(200).json({ results: data });
    })
    .catch(error => {
      res.status(400).send(error);
    });
});
