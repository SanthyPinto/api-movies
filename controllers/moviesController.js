const {
  createMovie,
  getMovies,
  getNewestMovies,
  createViewedMovieByUser,
  getViewedMoviesByUser,
} = require("../models/moviesModel");

const createMovieHandler = async (req, res) => {
  try {
    const { title, description, categoryId, releaseDate, duration, rating } =
      req.body;
    await createMovie(
      title,
      description,
      categoryId,
      releaseDate,
      duration,
      rating
    );
    res.status(201).json({ message: "Película creada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear la película" });
  }
};

const getMoviesHandler = async (req, res) => {
  try {
    const { title, category, limit = 10, page = 1 } = req.query;
    const results = await getMovies(title, category, limit, page);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error cargando las peliculas" });
  }
};

const getNewestMoviesHandler = async (req, res) => {
  try {
    const results = await getNewestMovies();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error cargando las peliculas" });
  }
};

const createViewedMovieByUserHandler = async (req, res) => {
  try {
    const { id_movie } = req.params;
    const { id_user } = req.body;
    await createViewedMovieByUser(id_movie, id_user);
    res
      .status(201)
      .json({ message: "Pelicula marcada como vista por el usuario" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error marcando pelicula como vista" });
  }
};

const getViewedMoviesByUserHandler = async (req, res) => {
  try {
    const { id_user } = req.params;
    const results = await getViewedMoviesByUser(id_user);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error cargando las peliculas vistas por el usuario" });
  }
};

module.exports = {
  createMovieHandler,
  getMoviesHandler,
  getNewestMoviesHandler,
  createViewedMovieByUserHandler,
  getViewedMoviesByUserHandler,
};
