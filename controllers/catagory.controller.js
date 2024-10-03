const Catagory = require("../models/Catagory");

const getCatagories = async (req, res) => {
  try {
    const Catagories = await Catagory.find();
    res.status(200).json({
      message: "Catagories fetched successfully",
      data: Catagories,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong.",
    });
  }
};

const addCatagory = async (req, res) => {
  await Catagory.create(req.body);
  res.status(201).json({
    message: "Catagory added successfully.",
  });
};

const getCatagoryById = async (req, res) => {
  const catagory = await Catagory.findById(req.params.catagoryId);
  res
    .status(200)
    .json({ message: "Catagory fetched successfully", data: catagory });
};

const deleteCatagoryById = async (req, res) => {
  await Catagory.deleteOne({ _id: req.params.catagoryId });
  res.status(200).json({ message: "Catagory deleted succesfully" });
};

const updateCatagoryById = async (req, res) => {
  const id = req.params.catagoryId;
  await Catagoey.updateOne({ _id: id }, req.body);
  res.status(200).json({
    message: "Catagory updated succesfully.",
  });
};

module.exports = {
  getCatagoryById,
  getCatagories,
  deleteCatagoryById,
  updateCatagoryById,
  addCatagory,
};
