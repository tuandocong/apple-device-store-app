const express = require("express");
const orderControllers = require("../controllers/orders");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();
//CREATE A ORDER
router.post("/add-order", isAuth, orderControllers.addOrder);

//GET ORDER BY USER ID
router.get("/getById", isAuth, orderControllers.getOrderByUserId);

//GET ORDER BY ORDER ID
router.get("/order/:id", isAuth, orderControllers.getOrderById);

module.exports = router;
