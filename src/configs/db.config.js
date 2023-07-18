const mysql = require("mysql2");

const connection = mysql.createConnection({
  database: "nodejs-test",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: "root",
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
