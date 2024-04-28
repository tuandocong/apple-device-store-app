const express = require("express");
const productControllers = require("../controllers/products");

const router = express.Router();

//GET ALL
router.get("/", productControllers.getProducts);
// //GET BY ID
// router.get("/product/:id", roomControllers.getRoomById);

// CREATE
router.post("/add-product", productControllers.postAddProduct);

// //UPDATE
router.post("/update-product/:id", productControllers.postEditProduct);

// //DELETE
router.post("/delete-product/:id", productControllers.deleteProductById);

module.exports = router;
