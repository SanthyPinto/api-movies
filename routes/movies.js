const express = require('express');
const router = express.Router();
const { createMovieHandler, getMoviesHandler } = require('../controllers/moviesController');

// Ruta para crear una pelicula
router.post('/', createMovieHandler);

// Ruta para filtrar peliculas por titulo y categoria
router.get('/', getMoviesHandler);

module.exports = router;
