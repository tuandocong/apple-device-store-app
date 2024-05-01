const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    // 1.lay token trong Header
    const token = req.headers.authorization?.split(" ")[1];
    // const token = req.get("Authorization");
    // console.log("token: ", token);

    // 2.kiem tra co token gui den ko
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token not found!", isSuccess: false });
    }

    // 3.kiem tra token co hop le
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("decoded: ", decoded);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Token invalid!", isSuccess: false });
    }
    // gan user vao req
    req.user = user;

    // 4.chay next() de chuyen den cac middleware phia duoi
    next();
  } catch (error) {
    next(error);
  }
};
