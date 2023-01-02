const mongoose = require("mongoose");

const optionSchema = mongoose.Schema(
  {
    half: String,
    full: String,
  },
  { _id: false }
);

const foodSchema = mongoose.Schema({
  CategoryName: String,
  name: String,
  img: String,
  options: { type: [optionSchema] },
  description: String,
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
