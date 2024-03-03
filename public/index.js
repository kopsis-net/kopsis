const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.EX_PORT;
app.use(cors());
app.use(cors({
  origin: '*'
}));
// Örnek veri
const sampleData = { message: 'Hello from Express!' };

// API endpoint'i oluşturma
app.get('/', (req, res) => {
   // Örnek bir JSON yanıtı döndürme
   const data = {
    message: 'Merhaba, dünya!'
  };

  res.json(data);
});

app.listen(port, () => {
  console.log(`Uygulama http://${process.env.DB_HOST}:${port} adresinde çalışıyor`);
});
