const connection = require("../configs/db.config");

const TodoModel = {};

TodoModel.getAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM todo", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = TodoModel;
