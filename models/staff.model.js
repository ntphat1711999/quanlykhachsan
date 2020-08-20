const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  ten: {
    type: String,
    trim: true,
    required: true,
  },
  cmnd: {
    type: String,
    required: true,
    unique: true,
  },
  luong: {
    type: Number,
    required: true,
  },
  so_ngay_nghi: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("staff", staffSchema);
