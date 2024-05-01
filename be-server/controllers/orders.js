const Cart = require("../models/cart");
const Order = require("../models/order");

//Add to Cart
exports.addOrder = async (req, res, next) => {
  try {
    const cartId = req.user.cartId;

    const user = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      phone: req.body.phone,
      address: req.body.address,
    };

    //Tìm cart muốn tạo Order
    const cart = await Cart.findById(cartId).populate(
      "products.productId",
      "_id name img1 price "
    );

    //Lấy products từ Cart
    const produstsCart = [...cart.products];
    // console.log("DATA:", produstsCart);

    //Tính tổng giá tiền
    const totalPrice = produstsCart.reduce(
      (acc, current) => acc + current.productId.price * current.quantity,
      0
    );

    //lấy các trường cần thiết cho Order.products
    const products = produstsCart.map((p) => {
      return {
        productId: p.productId._id,
        quantity: p.quantity,
        price: p.productId.price,
        productName: p.productId.name,
        img: p.productId.img1,
      };
    });

    //tạo 1 order mới
    const newOrder = new Order({
      user: user,
      products: products,
      totalPrice: totalPrice,
    });
    await newOrder.save();

    // Delete giá trị Cart.products
    await Cart.findByIdAndUpdate(cart._id, {
      $set: { products: [] },
    });

    //Trả res về phía client
    res.status(201).json({ msg: "Order success!", isSuccess: true });
  } catch (error) {
    next(error);
  }
};

//Get Orders by userID
exports.getOrderById = async (req, res, next) => {
  try {
    const name = req.user._id;

    const orders = await Order.find({ "user._id": name });
    console.log("result:", orders);
    //trả kết quả về cho Client:
    res.status(201).json(orders);
  } catch (error) {
    next(error);
  }
};
