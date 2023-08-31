const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserService {
  static async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  }
  static async createUser(userData) {
    try {
      const existingUser = await User.findOne({ user: userData.user });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      const newUser = await User.create({
        user: userData.user,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getUserByUsername(username) {
    try {
      const user = await User.findOne({ user: username });
      return user;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }
}

module.exports = UserService;
