const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    // console.log("USER: ", req.user);
    // 1.Kiem tra user co phai la mot admin khong?
    if (req.user.role !== "admin") {
      // trả về res khi không phai admin
      return res
        .status(401)
        .json({ message: "Unauthorized", isSuccess: false });
    }

    // 2.chay next() de chuyen den cac middleware phia duoi
    next();
  } catch (error) {
    next(error);
  }
};
