const connection = require("../configs/db.config");

const UserModel = {};
UserModel.create = (username, password) => {
  console.log(username, password);
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO account (username, password) VALUES (?, ?)",
      [username, password],

      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};
UserModel.find = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM account WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};
UserModel.getAll = (skip, limit) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM account LIMIT ?, ?",
      [skip, limit],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = UserModel;
