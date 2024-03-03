const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.EX_PORT;

app.get('/', (req, res) => {
  res.send('Merhaba Dünya! Nasılsınız');
});

app.listen(port, () => {
  console.log(`Uygulama http://${process.env.DB_HOST}:${port} adresinde çalışıyor`);
});
