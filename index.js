require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connection = require('./config/db');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.get('/', async (req, res) => {
    res.json({
        message: "Movies"
    });
});

app.listen(PORT, () => {
    console.log(`Listen to server in ${PORT}`);
});

