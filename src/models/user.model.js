const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, maxLength: 255, unique: true },
    password: { type: String, required: true, maxLength: 255 },
  },
  { collection: "users" }
);

userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema);

module.exports = User;
