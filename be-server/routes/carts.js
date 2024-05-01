const express = require("express");
const cartControllers = require("../controllers/carts");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();
//ADD TO CART
router.post("/add-cart", isAuth, cartControllers.addToCart);

//DELETE FROM CART
router.post("/remove-cart", isAuth, cartControllers.removeFromCart);

//UPDATE CART
router.post("/update-cart", isAuth, cartControllers.updateCart);

//GET CART BY ID
router.get("/getById", isAuth, cartControllers.getCartById);

module.exports = router;
