const User = require("../models/user");

//lay tat ca Users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "client" });
    res.status(200).json({ data: users, isSuccess: true });
  } catch (error) {
    res.status(500).json(err);
  }
};

//lay user theo id
exports.getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err);
  }
};

//update User
exports.postEditUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const editUser = await User.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json(editUser);
  } catch (error) {
    res.status(500).json(err);
  }
};

//Delete User
exports.deleteUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.findByIdAndRemove(id);
    res.status(200).json("User has been delete");
  } catch (error) {
    res.status(500).json(err);
  }
};

//Count User
exports.countUser = async (req, res, next) => {
  try {
    const countUser = await User.countDocuments({ role: "client" });
    res.status(200).json(countUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
