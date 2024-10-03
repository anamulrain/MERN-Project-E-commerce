const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  featured: Boolean,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
