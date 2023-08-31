const express = require("express");
const {
  getUsers,
  createUser,
  login,
} = require("../controllers/user.controller.js");
const authenticateToken = require("../middleware/authentication.js");

const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.post("/create", createUser);
router.post("/login", login);
module.exports = router;
