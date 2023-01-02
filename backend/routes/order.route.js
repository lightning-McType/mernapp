const router = require("express").Router();
const { orderFood, myOrders } = require("../controllers/order.controller");

router.post("/", orderFood);
router.post("/myOrders", myOrders);

module.exports = router;
