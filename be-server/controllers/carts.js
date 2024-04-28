const Cart = require("../models/cart");

//Add to Cart
exports.addToCart = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const newProduct = {
      productId: req.body.productId,
      quantity: req.body.quantity,
    };

    //Tìm cart muốn chỉnh sửa
    const cart = await Cart.findById(cartId);

    //tìm vị trí product muốn thêm trong Cart (-1 nếu chưa có trong cart)
    const cartProductIndex = cart.products.findIndex((prod) => {
      return prod.productId.toString() === newProduct.productId.toString();
    });

    let newQuantity = newProduct.quantity;
    const updateProdCart = [...cart.products];

    if (cartProductIndex >= 0) {
      //Trường hợp product đã có trong Cart -> cập nhập lại quantity
      newQuantity =
        cart.products[cartProductIndex].quantity + Number(newQuantity);
      updateProdCart[cartProductIndex].quantity = newQuantity;
    } else {
      //Trường hợp là 1 product mới -> push vào Cart
      updateProdCart.push(newProduct);
    }

    // Cập nhập lại Cart
    await Cart.findByIdAndUpdate(cart._id, {
      $set: { products: updateProdCart },
    });

    //Trả res về phía client
    res
      .status(201)
      .json({ msg: "The product has been added to cart ", isSuccess: true });
  } catch (error) {
    next(error);
  }
};

//Delete from Cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const productId = req.body.productId;

    //Lấy cart cần chỉnh sửa products
    const cart = await Cart.findById(cartId);

    //tìm vị trí của product muốn xóa trong cart
    const cartProductIndex = cart.products.findIndex((prod) => {
      return prod.productId.toString() === productId.toString();
    });
    // console.log("cartProductIndex: ", cartProductIndex);

    //khai báo các biến
    let newQuantity;
    let finalProducts = [];
    const updateProdCart = [...cart.products];

    if (cartProductIndex < 0) {
      //Trường hợp không tìm thấy sản phẩm trong cart:
      throw new Error("Cannot find product!");
    } else {
      //Trường hợp có sản phẩm muốn remove trong cart:
      if (updateProdCart[cartProductIndex].quantity > 1) {
        //product có quantity > 1 -> cập nhập quantity -1
        newQuantity = updateProdCart[cartProductIndex].quantity - 1;
        updateProdCart[cartProductIndex].quantity = newQuantity;

        finalProducts = [...updateProdCart];
      } else {
        // product có quantity = 1 -> xóa product khỏi cart.products
        finalProducts = updateProdCart.filter(
          (prod) =>
            prod.productId !== updateProdCart[cartProductIndex].productId
        );
      }
    }

    //cập nhập lại Cart
    await Cart.findByIdAndUpdate(cart._id, {
      $set: { products: finalProducts },
    });

    //trả res về cho Client:
    res.status(201).json({
      msg: "The product has been removed from cart ",
      isSuccess: true,
    });
  } catch (error) {
    next(error);
  }
};
