const path = require('path');
// Force dotenv to load the .env located alongside this file
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log("🔑 Loaded Hugging Face Key:", process.env.HF_API_KEY);

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_KEY = process.env.HF_API_KEY;

require('dotenv').config();
console.log("Loaded Hugging Face Key:", process.env.HF_API_KEY);

app.use(express.static(path.join(__dirname, '../public')));


app.post('/api/quote', async (req, res) => {
  const { mood } = req.body;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/gpt2',
      {
        inputs: `Give a motivational quote for someone who is feeling ${mood}.`
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const quote = response.data[0]?.generated_text;
    res.json({ quote: quote || "You're amazing — keep going!" });

  } catch (error) {
    console.error("Hugging Face API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate quote." });
  }
});


app.listen(8000, () => {
  console.log('✅ Server running on http://localhost:8000');
});
