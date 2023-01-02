const Food = require("../models/food.model");
const FoodCategory = require("../models/foodCategory.model");

const getAllFood = async (req, res) => {
  try {
    const foodData = await Food.find({});
    res.json(foodData);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const foodCategory = await FoodCategory.find({});
    res.json(foodCategory);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getAllFood,
  getAllCategory
};
