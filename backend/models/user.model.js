const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: (email) => {
      return validator.isEmail(email);
    },
    unique: true,
  },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
