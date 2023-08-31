const express = require("express");
const todoRouter = require("./todo.routes");
const userRouter = require("./user.routes");

const apiRoute = express();

apiRoute.use("/todo", todoRouter);
apiRoute.use("/user", userRouter);

module.exports = apiRoute;
