const db = require('../config/db');

const createMovie = async (title, description, categoryId, releaseDate, duration, rating) => {
  return new Promise((resolve, reject) => {
    // Consulta SELECT para verificar si la categoría existe
    const checkCategoryQuery = `SELECT * FROM Categories WHERE id_category = ${categoryId}`;
    db.query(checkCategoryQuery, (error, results, fields) => {
      if (error) {
        reject(error);
      } else if (results.length === 0) { // Si no se encuentra la categoría
        reject(new Error('Category not found'));
      } else {
        // Si se encuentra la categoría, entonces ejecuta la consulta INSERT para la tabla Movies
        const insertMovieQuery = 'INSERT INTO Movies (title, description, release_date, duration, rating) VALUES (?, ?, ?, ?, ?)';
        const values = [title, description, releaseDate, duration, rating];
        db.query(insertMovieQuery, values, (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            // Si la consulta INSERT para la tabla Movies se ejecutó correctamente, entonces ejecuta la consulta INSERT para la tabla Movies_Categories
            const movieId = results.insertId; // Obtén el id de la película insertada
            const insertMoviewhitCategory = `INSERT INTO Movies_Categories (id_movie, id_category) VALUES (?, ?)`;
            const values = [movieId, categoryId];
            db.query(insertMoviewhitCategory, values, (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                resolve('Movie created');
              }
            });
          }
        });
      }
    });
  });
};

const getMovies = async (title, category) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM Movies';

    if (title || category) {
      query += ' WHERE';

      if (title) {
        query += ` title LIKE '%${title}%'`;
      }

      if (category) {
        if (title) {
          query += ' AND';
        }

        query += ` id_movie IN (SELECT id_movie FROM Movies_Categories WHERE id_category = ${category})`;
      }
    }
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
  createMovie, getMovies
};