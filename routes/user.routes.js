const { query } = require("express");
const express = require("express");
const { body } = require("express-validator");
const {
  getUserById,
  getUsers,
  deleteUserById,
  updateUserById,
  addUser,
} = require("../controllers/user.controller");
const {
  checkAuth,
  checkAuthAdmin,
} = require("../middleware/check-auth-middleware");
const validate = require("../middleware/validator.middleware");
const router = express.Router();

router.get("/", getUsers);
router.post(
  "/",
  checkAuth,
  body("name").notEmpty(),
  body("email").notEmpty(),
  body("password").notEmpty(),
  validate,
  addUser
);
router.get("/:userId", checkAuthAdmin, getUserById);
router.delete("/:userId", checkAuthAdmin, deleteUserById);
router.patch("/:userId", checkAuthAdmin, updateUserById);

module.exports = router;
