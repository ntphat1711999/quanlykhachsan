const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  ten_thuc_an: {
    type: String,
    trim: true,
    required: true,
  },
  don_gia: {
    type: Number,
    required: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("food", FoodSchema);
