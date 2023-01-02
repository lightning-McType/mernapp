const OrderModel = require("../models/order.model");

const orderFood = async (req, res) => {
  const { email, foodOrder, orderDate } = req.body;
  foodOrder.splice(0, 0, { orderDate });
  let eId = await OrderModel.findOne({ email });
  if (!eId) {
    try {
      const newOrderDoc = await new OrderModel({
        email,
        orderData: [foodOrder],
      });
      await newOrderDoc.save();
      res.json(newOrderDoc);
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    try {
      await OrderModel.findOneAndUpdate(
        { email },
        {
          $push: { orderData: foodOrder },
        }
      );
      res.end();
    } catch (err) {
      res.sendStatus(500);
    }
  }
};

const myOrders = async (req, res) => {
  const { email } = req.body;
  try {
    const myData = await OrderModel.findOne({ email });
    res.json({ orderData: myData });
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  orderFood,
  myOrders,
};
