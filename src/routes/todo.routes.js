const express = require("express");
const { getAllTodos } = require("../controllers/todo.controller.js");

const router = express.Router();

router.get("/", getAllTodos);
module.exports = router;
