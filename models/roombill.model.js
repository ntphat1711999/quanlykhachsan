const mongoose = require("mongoose");

const roomBillSchema = new mongoose.Schema({
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
    ref: "room",
  },
  ngay_thue: {
    type: Date,
    default: new Date(),
  },
  ngay_tra: {
    type: Date,
    default: new Date(),
  },
  thanh_toan: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("roombill", roomBillSchema);
