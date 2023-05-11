const mysql = require("mysql");

const connectionConfiguration = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

let connection;

const connectToDatabase = () => {
  if (!connection) {
    connection = mysql.createConnection(connectionConfiguration);
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
      }

      console.log("Connected to database with ID: " + connection.threadId);
    });
    connection.on("error", (error) => {
      if (error.code === "PROTOCOL_CONNECTION_LOST") {
        connection = null;
      } else {
        console.log(console.error);
      }
    });
  }
  return connection;
};

module.exports = { connectToDatabase };