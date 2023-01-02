const router = require("express").Router();

const {
  getAllFood,
  getAllCategory,
} = require("../controllers/food.controller");

router.get("/allFood", getAllFood);
router.get("/allCategory", getAllCategory);

module.exports = router;
