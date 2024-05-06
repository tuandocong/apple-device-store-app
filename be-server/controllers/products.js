const Product = require("../models/product");

//GET all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ availability: true });
    // console.log(products);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: err, isSuccess: false });
  }
};

//GET product by id
exports.getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    // console.log(products);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: err, isSuccess: false });
  }
};

//CREATE a new product
exports.postAddProduct = async (req, res, next) => {
  // console.log(">>> body: ", req.body);
  // console.log(">>> image: ", req.files);

  try {
    if (!req.files) {
      throw new Error(
        "Attached file is null or isn't an image. Please add image!"
      );
    }

    const newProd = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      short_desc: req.body.short_desc,
      long_desc: req.body.long_desc,
      img1: `${process.env.DOMAIN_BE}/${req.files[0].path}`,
      img2: `${process.env.DOMAIN_BE}/${req.files[1].path}`,
      img3: `${process.env.DOMAIN_BE}/${req.files[2].path}`,
      img4: `${process.env.DOMAIN_BE}/${req.files[3].path}`,
    });
    //save new product
    // console.log("newProduct >>>>", newProd);
    await newProd.save();
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
    await Product.findByIdAndUpdate(id, { $set: { availability: false } });
    res.status(200).json({ msg: "Product has been delete", isSuccess: true });
  } catch (error) {
    res.status(500).json({ msg: err, isSuccess: false });
  }
};
