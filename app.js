const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to handle Line Login callback
app.post('/callback', async (req, res) => {
    const { code } = req.body;
    const tokenUrl = 'https://api.line.me/oauth2/v2.1/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', 'http://localhost:3000/login.html');
    params.append('client_id', '1661018679');
    params.append('client_secret', 'c15520082b8549a8d5cf8ba6687a5400');

    try {
        const response = await axios.post(tokenUrl, params);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
