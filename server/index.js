require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/api/restaurants', (req, res) => {
  const apiURL = 'https://code-challenge.spectrumtoolbox.com/api/restaurants';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: process.env.VALUE,
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

app.listen(PORT, () => {
  console.log('Listening from port:', PORT);
});
