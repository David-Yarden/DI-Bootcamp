const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Part I — GET
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello From Express' });
});

// Part II — POST
app.post('/api/world', (req, res) => {
  console.log(req.body);
  const value = req.body.post;
  res.json({
    message: `I received your POST request. This is what you sent me: ${value}`,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
