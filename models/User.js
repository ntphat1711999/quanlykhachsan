const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    lowercase: true,
    trim: true,
    enum: ["quan_ly", "le_tan", "nha_hang", "guest"],
    default: "guest",
  },
});

module.exports = mongoose.modle("user", UserSchema);
