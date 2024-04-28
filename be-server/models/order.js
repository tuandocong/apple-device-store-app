const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    _id: String,
    username: String,
    email: String,
    phone: String,
    address: String,
  },
  // products: { type: [], required: true, default: [] },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      price: String,
      productName: String,
      img: String,
    },
  ],
  orderTime: {
    type: Date,
    default: Date.now(),
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "shipping", "completed", "canceled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
