// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   database: "nodejs-test",
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: "root",
//   password: process.env.DB_PASSWORD,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL database", err);
//     return;
//   }
//   console.log("Connected to MySQL database");
// });

// module.exports = connection;

const mongoose = require("mongoose");

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.DB_USER || "",
  pass: process.env.DB_PASSWORD || "",
};

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/nodejs-test", {});
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
  }
};

module.exports = { connection };
