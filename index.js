const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json({
        message: "Movies"
    });
});

app.listen(PORT, () => {
    console.log(`Listen to server in ${PORT}`);
});