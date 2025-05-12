// server.js
const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url param');
  req.pipe(request(targetUrl)).pipe(res);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
