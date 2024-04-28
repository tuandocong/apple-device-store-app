const express = require("express");
const orderControllers = require("../controllers/orders");

const router = express.Router();
//CREATE A ORDER
router.post("/add-order/:cartId", orderControllers.addOrder);

//GET ORDER BY ID
router.get("/order/:userId", orderControllers.getOrderById);

module.exports = router;
