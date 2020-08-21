const mongoose = require("mongoose");

const catRoomSchema = new mongoose.Schema({
  ten: {
    type: String,
    trim: true,
    required: true,
  },
  don_gia: {
    type: Number,
    default: 1000000,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("catRoom", catRoomSchema);
