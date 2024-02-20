const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  Email: { type: String, required: true },
  Telephone: { type: String, required: true },
  Aadhar: { type: String, required: true },
  Password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
