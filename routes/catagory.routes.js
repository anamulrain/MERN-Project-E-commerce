const express = require("express");
const { body } = require("express-validator");
const {
  getCatagoryById,
  getCatagories,
  deleteCatagoryById,
  updateCatagoryById,
  addCatagory,
} = require("../controllers/catagory.controller");
const {
  checkAuth,
  checkAuthAdmin,
} = require("../middleware/check-auth-middleware");
const validate = require("../middleware/validator.middleware");

const router = express.Router();

router.get("/", getCatagories);
router.post("/", checkAuth, body("name").notEmpty(), validate, addCatagory);
router.get("/:catagoryId", checkAuth, getCatagoryById);
router.delete("/:catagoryId", checkAuthAdmin, deleteCatagoryById);
router.patch("/:catagoryId", checkAuthAdmin, updateCatagoryById);
module.exports = router;
