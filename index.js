const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connection = require('./config/db');

app.get('/', async (req, res) => {
    res.json({
        message: "Movies"
    });
});

app.listen(PORT, () => {
    console.log(`Listen to server in ${PORT}`);
});

