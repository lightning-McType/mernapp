const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  orderData: { type: Array, required: true },
});

const orderModel = mongoose.model("OrderModel", orderSchema);
module.exports = orderModel;
