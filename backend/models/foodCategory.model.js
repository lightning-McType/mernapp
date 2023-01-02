const mongoose = require("mongoose");

const foodCategorySchema = mongoose.Schema({
  CategoryName: String,
});

const foodCategoryModel = mongoose.model("FoodCategory", foodCategorySchema);

module.exports = foodCategoryModel;
