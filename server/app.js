const express = require('express');
const { connectWhatsApp } = require('./services/BaileysService');

const app = express();

app.get('/start', async (req, res) => {
  await connectWhatsApp();
  res.send('WhatsApp connected');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
