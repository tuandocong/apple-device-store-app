const express = require("express");
const cartControllers = require("../controllers/carts");

const router = express.Router();
//ADD TO CART
router.post("/add-cart/:id", cartControllers.addToCart);

//DELETE FROM CART
router.post("/remove-cart/:id", cartControllers.removeFromCart);

module.exports = router;
