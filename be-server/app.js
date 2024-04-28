const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productRoute = require("./routes/products");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/carts");
const orderRoute = require("./routes/orders");
//
//
const app = express();

//---------------middlewares-------------
app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRoute);
app.use("/auth", authRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
// app.use("/transaction", transactionRoute);

//ERROR 404 PAGE
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "No Found Page!",
  });
});

app.use((err, req, res, next) => {
  console.log("ERROR MIDDLEWARE:", err.message);
  return res.status(500).json({
    isSuccess: false,
    msg: err.message || "something went wrong!",
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Connected !!!");
    return result;
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("SERVER start at POST: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
