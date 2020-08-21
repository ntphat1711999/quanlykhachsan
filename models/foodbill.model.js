const mongoose = require("mongoose");

const FoodBillSchema = new mongoose.Schema({
  ten: {
    type: String,
    trim: true,
    required: true,
  },
  phong: {
    type: String,
    required: true,
  },
  tong_tien: {
    type: Number,
  },
  thuc_an: [{ type: mongoose.Schema.Types.ObjectId, ref: "food" }],
  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("foodbill", FoodBillSchema);
