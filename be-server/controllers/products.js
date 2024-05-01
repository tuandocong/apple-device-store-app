const Product = require("../models/product");

//GET all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    // console.log(products);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: err, isSuccess: false });
  }
};

//CREATE a new product
exports.postAddProduct = async (req, res, next) => {
  const newProd = new Product(req.body);
  // console.log(req.user);
  try {
    //save new product
    const savedProd = await newProd.save();
    res.status(200).json({ msg: "New product created!", isSuccess: true });
  } catch (err) {
    res.status(500).json({ msg: err, isSuccess: false });
  }
};

//UPDATE product
exports.postEditProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const editProduct = await Product.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json({ msg: "Product updated!", isSuccess: true });
  } catch (err) {
    res.status(500).json({ msg: err, isSuccess: false });
  }
};

//DELETE product
exports.deleteProductById = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndRemove(id);
    res.status(200).json({ msg: "Product has been delete", isSuccess: true });
  } catch (error) {
    res.status(500).json({ msg: err, isSuccess: false });
  }
};
