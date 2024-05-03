const Cart = require("../models/cart");
const Order = require("../models/order");
const nodemailer = require("nodemailer");

//Tạo Transporter:
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

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

    //gui mail:
    const info = await transporter.sendMail({
      from: process.env.APP_EMAIL, // sender address
      to: user.email, // list of receivers
      subject: "EMAIL THÔNG BÁO ĐẶT HÀNG THÀNH CÔNG", // Subject line
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              color: white;
            }
            .header-mail{
              color:white;
              margin-bottom:30px;
            }
            .contain {
              padding: 20px;
              width: 90vw;
              background-color: rgb(41, 41, 41);
              color: white;
            }
            table-products {
              width: 100%;
            }
            td {
              text-align: center;
              padding: 10px;
              border: 1px solid white;
              max-width: 10%;
            }
            img {
              max-width: 100px;
            }
          </style>
        </head>
        <body>
          <div class="contain">
            <div class="header-mail">
              <h1>Xin chao ${user.username}</h1>
              <div>Phone: ${user.phone}</div>
              <div>Address: ${user.address}</div>
            </div>
      
            <div class="table-products">
              <table>
                <tr>
                  <td>Tên Sản Phẩm</td>
                  <td>Hình Ảnh</td>
                  <td>Giá</td>
                  <td>Số Lượng</td>
                  <td>Thành Tiền</td>
                </tr>
                ${products
                  .map(
                    (prod) => `
                    <tr>
                        <td>${prod.productName}</td>
                        <td><img src="${prod.img}" alt="Product Image"></td>
                        <td>${new Intl.NumberFormat("it-IT", {
                          style: "currency",
                          currency: "VND",
                        }).format(prod.price)}</td>
                        <td>${prod.quantity}</td>
                        <td>${new Intl.NumberFormat("it-IT", {
                          style: "currency",
                          currency: "VND",
                        }).format(prod.price * prod.quantity)} </td>
                    </tr>
                `
                  )
                  .join("\n")}
              </table>
            </div>
      
            <h1>Tổng Thanh Toán:</h1>
            <h1>${new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "VND",
            }).format(totalPrice)}</h1>
      
            <h1>Cảm ơn bạn!</h1>
          </div>
        </body>
      </html>
      
      `, // html body
    });

    //Trả res về phía client
    res.status(201).json({ msg: "Order success!", isSuccess: true });
  } catch (error) {
    next(error);
  }
};

//Get Orders by userID
exports.getOrderByUserId = async (req, res, next) => {
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

//Get Orders by userID
exports.getOrderById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;
    console.log("here", orderId);

    const ordersArr = await Order.find({ "user._id": userId });
    const result = ordersArr.filter(
      (order) => order._id.toString() === orderId.toString()
    );
    // console.log("result:", result);
    if (result.length === 0) {
      throw new Error("No Found Order");
    }

    //trả kết quả về cho Client:
    res.status(201).json({ isSuccess: true, data: result[0] });
  } catch (error) {
    next(error);
  }
};
