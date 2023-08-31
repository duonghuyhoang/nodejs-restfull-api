const UserService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async getUsers(req, res) {
    try {
      const userId = req.user.userId;
      const user = await UserService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await UserService.createUser(userData);
      res.json({ message: "success!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async login(req, res) {
    try {
      const { user, password } = req.body;

      const existingUser = await UserService.getUserByUsername(user);

      if (!existingUser) {
        throw new Error("User not found");
        return;
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Log in success!", token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = UserController;
