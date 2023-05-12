const { connectToDatabase } = require("../config/db");

const createMovie = async (
  title,
  description,
  categoryId,
  releaseDate,
  duration,
  rating
) => {
  return new Promise((resolve, reject) => {
    const db = connectToDatabase();
    // Consulta SELECT para verificar si la categoría existe
    const checkCategoryQuery = `SELECT * FROM Categories WHERE id_category = ${categoryId}`;
    db.query(checkCategoryQuery, (error, results, fields) => {
      if (error) {
        reject(error);
      } else if (results.length === 0) {
        // Si no se encuentra la categoría
        reject(new Error("Category not found"));
      } else {
        // Si se encuentra la categoría, entonces ejecuta la consulta INSERT para la tabla Movies
        const insertMovieQuery =
          "INSERT INTO Movies (title, description, release_date, duration, rating) VALUES (?, ?, ?, ?, ?)";
        const values = [title, description, releaseDate, duration, rating];
        db.query(insertMovieQuery, values, (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            // Si la consulta INSERT para la tabla Movies se ejecutó correctamente, entonces ejecuta la consulta INSERT para la tabla Movies_Categories
            const movieId = results.insertId; // Obtén el id de la película insertada
            const insertMoviewhitCategory = `INSERT INTO Movies_Categories (id_movie, id_category) VALUES (?, ?)`;
            const values = [movieId, categoryId];
            db.query(
              insertMoviewhitCategory,
              values,
              (error, results, fields) => {
                if (error) {
                  reject(error);
                } else {
                  resolve("Movie created");
                }
              }
            );
          }
        });
      }
    });
  });
};

const getMovies = async (title, category, limit = 10, page = 1) => {
  const db = connectToDatabase();
  const startIndex = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM Movies";

    if (title || category) {
      query += " WHERE";

      if (title) {
        query += ` title LIKE '%${title}%'`;
      }

      if (category) {
        if (title) {
          query += " AND";
        }

        query += ` id_movie IN (SELECT id_movie FROM Movies_Categories WHERE id_category = ${category})`;
      }
    }

    query += ` LIMIT ${startIndex}, ${limit}`;

    db.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getNewestMovies = async () => {
  const db = connectToDatabase();

  return new Promise((resolve, reject) => {
    let query =
      "SELECT * FROM Movies WHERE release_date >= NOW() - INTERVAL 3 WEEK";
    db.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const createViewedMovieByUser = async (id_movie, id_user) => {
  const db = connectToDatabase();

  return new Promise((resolve, reject) => {
    const query = "INSERT INTO Users_Movies (id_movie, id_user) VALUES (?, ?)";
    const values = [id_movie, id_user];
    db.query(query, values, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve("Viewed movie add to user");
      }
    });
  });
};

const getViewedMoviesByUser = async (id_user) => {
  const db = connectToDatabase();

  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM Users_Movies WHERE id_user = ${id_user}`;
    db.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  createMovie,
  getMovies,
  getNewestMovies,
  createViewedMovieByUser,
  getViewedMoviesByUser,
};
