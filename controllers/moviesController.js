const { createMovie, getMovies } = require('../models/moviesModel');

const createMovieHandler = async (req, res) => {
    try {
      const { title, description, categoryId, releaseDate, duration, rating } = req.body;
      await createMovie(title, description, categoryId, releaseDate, duration, rating);
      res.status(201).json({ message: 'Película creada correctamente' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al crear la película' });
    }
  };

  const getMoviesHandler = async (req, res) => {
    try {
      const { title, category } = req.query;
      const results = await getMovies(title, category);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error cargando las peliculas' });
    }
  };

module.exports = { createMovieHandler, getMoviesHandler };