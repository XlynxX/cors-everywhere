const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Configure CORS properly
app.use(cors({
  origin: true,              // allow any origin (or set specific domain)
  credentials: true          // allow credentials (cookies, etc.)
}));

// Proxy endpoint
app.get('/', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing ?url=');

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cookie': req.headers.cookie || ''
      }
    });

    // Set proper CORS headers on the response
    res.set('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.set('Access-Control-Allow-Credentials', 'true');

    res.status(response.status).send(response.data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(err.response?.status || 500).send(err.message);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
