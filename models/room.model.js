const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  ten_phong: {
    type: String,
    trim: true,
    required: true,
  },
  loai: {
    type: String,
    required: true,
    ref: "catRoom",
  },
  tinh_trang: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("room", RoomSchema);
