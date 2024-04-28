const User = require("../models/user");
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//SIGNUP
exports.signUpUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const phone = req.body.phone;
    const password = req.body.password;

    //ma hoa password
    const hashedPassword = await bcrypt.hash(password, 12);

    //tao 1 cart moi cho user
    const newCart = new Cart({
      username: username,
      products: [],
    });
    const cart = await newCart.save();

    // tao User moi
    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
      phone: phone,
      cartId: cart._id,
    });

    await newUser.save();
    res
      .status(200)
      .json({ msg: "User was created successfully", isSuccess: true });
  } catch (error) {
    res.status(500).json({ msg: error, isSuccess: false });
  }
};

//LOGIN
exports.loginUser = async (req, res, next) => {
  const emailCheck = req.body.email;
  const passwordCheck = req.body.password;
  try {
    const user = await User.findOne({
      email: emailCheck,
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "Username or password is incorrect!", isSuccess: false });
    }
    //kiem tra mat khau:
    const doMatch = await bcrypt.compare(passwordCheck, user.password);
    console.log(doMatch);
    if (!doMatch) {
      return res
        .status(404)
        .json({ msg: "Username or password is incorrect!", isSuccess: false });
    }
    // console.log("LOGGED IN: ", user);

    //tach password
    const { password, ...ortherData } = user._doc;

    const accessToken = jwt.sign(ortherData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      msg: "LOGGED IN",
      isSuccess: true,
      user: ortherData,
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};
