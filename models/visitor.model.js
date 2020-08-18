const mongoose = require("mongoose");

const visistorSchema = new mongoose.Schema({
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
  phong_thue: {
    type: mongoose.Schema.Types.ObjectId,
    default: false,
    ref: "room",
  },
  ngay_thue: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("visitor", visistorSchema);
