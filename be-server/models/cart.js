const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        // type: String,
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
