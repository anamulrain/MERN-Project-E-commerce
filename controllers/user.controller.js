const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json({
      message: "Users fetched successfully",
      data: Users,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong.",
    });
  }
};

const addUser = async (req, res) => {
  await User.create(req.body);
  res.status(201).json({
    message: "User added successfully.",
  });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json({ message: "User fetched successfully", data: user });
};

const deleteUserById = async (req, res) => {
  await User.deleteOne({ _id: req.params.userId });
  res.status(200).json({ message: "User deleted succesfully" });
};

const updateUserById = async (req, res) => {
  const id = req.params.userId;
  await User.updateOne({ _id: id }, req.body);
  res.status(200).json({
    message: "User updated succesfully.",
  });
};

module.exports = {
  getUserById,
  getUsers,
  deleteUserById,
  updateUserById,
  addUser,
};
