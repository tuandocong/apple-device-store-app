const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/users");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");

//GET BY ID
router.get("/user/:id", userControllers.getUserById);

//GET ALL Clients
router.get("/clients", isAuth, userControllers.getUsers);

//UPDATE
router.post("/update-user/:id", userControllers.postEditUser);

//DELETE
router.post("/delete-user/:id", userControllers.deleteUserById);

//COUNT
router.get("/count", userControllers.countUser);

module.exports = router;
