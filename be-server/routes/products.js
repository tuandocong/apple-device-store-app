const express = require("express");
const productControllers = require("../controllers/products");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

//GET ALL
router.get("/", productControllers.getProducts);

// CREATE
router.post("/add-product", isAdmin, productControllers.postAddProduct);

// //UPDATE
router.post("/update-product/:id", isAdmin, productControllers.postEditProduct);

// //DELETE
router.post(
  "/delete-product/:id",
  isAdmin,
  productControllers.deleteProductById
);

module.exports = router;
