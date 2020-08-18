const mongoose = require("mongoose");

const catRoomSchema = new mongoose.Schema({
  ten: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  so_luong: {
    type: Number,
    required: true,
  },
  don_gia: {
    type: Number,
    default: 1000000,
  },
});

module.exports = mongoose.model("catRoom", catRoomSchema);
