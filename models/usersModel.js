const { connectToDatabase } = require("../config/db");

const createUser = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    const db = connectToDatabase();
    const query =
      "INSERT INTO Users (name, email, password, registration_date) VALUES (?, ?, ?, ?)";
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const values = [name, email, password, formattedDate];
    db.query(query, values, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve("User created");
      }
    });
  });
};

module.exports = { createUser };
