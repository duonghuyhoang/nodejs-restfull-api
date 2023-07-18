const express = require("express");
const todoRouter = require("./todo.routes");
const UserModel = require("../models/auth.model");
const PAGE_SIZE = 5;
var jwt = require("jsonwebtoken");
const apiRoute = express();

apiRoute.use("/todo", todoRouter);
apiRoute.post("/auth", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  UserModel.find(username)
    .then((results) => {
      if (results.length > 0) {
        res.json("Tài khoản đã tồn tại trong cơ sở dữ liệu");
      } else {
        UserModel.create(username, password)
          .then((results) => {
            res.json("Tài khoản mới đã được tạo:");
          })
          .catch((err) => {
            res.status(500).json({ message: "Lỗi khi tạo tài khoản mới:" });
            console.error(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Lỗi khi tạo tài khoản mới:" });
    });

  console.log(username, password);
});
apiRoute.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  UserModel.find(username)
    .then((results) => {
      if (results.length > 0) {
        res.json("Đăng nhập thành công >>>");
      } else {
        res.json("Tài khoản hoặc mặt khẩu sai!!!");
      }
    })
    .catch((err) => {
      res.status(300).json({ message: "Lỗi đăng nhập" });
    });

  console.log(username, password);
});
apiRoute.get("/user", (req, res, next) => {
  let page = req.query.page;
  if (page) {
    page = parseInt(page);
    const skip = (page - 1) * PAGE_SIZE;

    UserModel.getAll(skip, PAGE_SIZE)
      .then((results) => {
        res.json(results);
        console.log(results);
        var token = jwt.sign(results[4].id, "mkhoang");
        console.log(token);
        var ress = jwt.verify(token, "mkhoang");
        console.log(ress);
      })
      .catch((err) => {
        res.status(500).json({ message: "Lỗi khi lấy danh sách tài khoản" });
        console.error(err);
      });
  } else {
    UserModel.getAll()
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.status(500).json({ message: "Lỗi khi lấy danh sách tài khoản" });
        console.error(err);
      });
  }
});

module.exports = apiRoute;
