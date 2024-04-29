const express = require("express");
const authControllers = require("../controllers/auth");

const router = express.Router();

//DANG KY USER
router.post("/signup", authControllers.signUpUser);

//DANG NHAP
router.post("/login", authControllers.loginUser);

module.exports = router;
