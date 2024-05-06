const express = require("express");
const productControllers = require("../controllers/products");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

//GET ALL
router.get("/", productControllers.getProducts);

//GET By ID
router.get("/product/:id", productControllers.getById);

// CREATE
router.post("/add-product", isAuth, isAdmin, productControllers.postAddProduct);

// //UPDATE
router.post(
  "/update-product/:id",
  isAuth,
  isAdmin,
  productControllers.postEditProduct
);

// //DELETE
router.delete(
  "/delete-product/:id",
  isAuth,
  isAdmin,
  productControllers.deleteProductById
);

module.exports = router;
