const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const data = JSON.parse(fs.readFileSync('data.json'));

app.get('/', (req, res) => {
  res.send('Welcome to the PDF Table Data API. Use /api/data to fetch the table data.');
});

app.get('/api/data', (req, res) => {
  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});