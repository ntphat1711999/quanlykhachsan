const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  ten_thuc_an: {
    type: String,
    trim: true,
    required: true
  },
  so_luong: {
    type: Number,
    required: true,
  },
  don_gia: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("food", FoodSchema);
