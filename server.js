// server.js — run with: node server.js
// Install first: npm install express cors node-fetch

const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // serves your HTML files

// Your Anthropic API key — get it from console.anthropic.com
const ANTHROPIC_API_KEY = 'YOUR_API_KEY_HERE';

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':         'application/json',
        'x-api-key':            ANTHROPIC_API_KEY,
        'anthropic-version':    '2023-06-01'
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system:     req.body.system,
        messages:   req.body.messages
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('OyuMind server running at http://localhost:3000');
  console.log('Open oyumind-landing.html in your browser');
});
