const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  getProductById,
  getProducts,
  deleteProductById,
  updateProductById,
  addProduct,
} = require("../controllers/product.controllers");
const {
  checkAuth,
  checkAuthAdmin,
} = require("../middleware/check-auth-middleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", checkAuthAdmin, upload.single("image"), addProduct);
router.get("/:productId", checkAuth, getProductById);
router.delete("/:productId", checkAuthAdmin, deleteProductById);
router.patch("/:productId", checkAuthAdmin, updateProductById);
module.exports = router;
