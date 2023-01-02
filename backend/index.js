require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.route");
const foodRoutes = require("./routes/food.route");
const orderRoutes = require("./routes/order.route");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, { dbName: "gofoodmern" })
  .then(() => {
    console.log("Connected to Mongo database");
  })
  .catch((err) => console.log(err));

app.use("/user", userRoutes);
app.use("/food", foodRoutes);
app.use("/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Started to listen on port ${PORT}`);
});
