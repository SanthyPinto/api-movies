const express = require("express");
const router = express.Router();
const {
  createMovieHandler,
  getMoviesHandler,
  getNewestMoviesHandler,
  createViewedMovieByUserHandler,
  getViewedMoviesByUserHandler,
} = require("../controllers/moviesController");

// Ruta para crear una pelicula
router.post("/", createMovieHandler);

// Ruta para filtrar peliculas por titulo y categoria
router.get("/", getMoviesHandler);

router.get("/newest", getNewestMoviesHandler);

router.post("/viewed/:id_movie", createViewedMovieByUserHandler);

router.get("/viewed/users/:id_user", getViewedMoviesByUserHandler);

module.exports = router;
