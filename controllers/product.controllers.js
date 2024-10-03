const Product = require("../models/Product");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1];
    cb(null, Date.now() + "." + fileExtension);
  },
});

const upload = multer({ storage: storage });

const getProducts = async (req, res) => {
  const sortByFilter = {};
  if (req.query.order) {
    sortByFilter.price = req.query.order;
  }
  const filter = { name: new RegExp(req.query.search) };
  if (req.query.minPrice && req.query.maxPrice) {
    filter.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
  }

  const products = await Product.find(filter)
    .sort(sortByFilter)
    .limit(req.query.limit ?? 10)
    .skip(((req.query.page ?? 1) - 1) * req.query.limit ?? 10);

  const total = await Product.countDocuments(filter);

  res.status(200).json({
    message: "Products fetched successfully",
    data: {
      page,
      data: products,
      total,
    },
  });
};

const addProduct = async (req, res) => {
  await Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: String,
    image: req.file.filename,
    user: req.authUser._id,
  });
  res.status(201).json({
    message: "Product added successfully.",
  });
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res
    .status(200)
    .json({ message: "Product fetched successfully", data: product });
};

const deleteProductById = async (req, res) => {
  await Product.deleteOne({ _id: req.params.productId });
  res.status(200).json({
    message: "Product deleted succesfully",
  });
};

const updateProductById = async (req, res) => {
  const id = req.params.productId;
  await Product.updateOne({ _id: id }, req.body);
  res.status(200).json({
    message: "Product updated succesfully.",
  });
};

module.exports = {
  getProductById,
  getProducts,
  deleteProductById,
  updateProductById,
  addProduct,
};
