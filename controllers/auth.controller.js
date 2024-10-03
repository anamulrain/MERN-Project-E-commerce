const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/constant");
const signUp = async (req, res) => {
  const { password, ...remaning } = req.body;
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(400).json({
      message: "User already exist.",
    });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  await User.create({
    ...remaning,
    password: hashPassword,
  });
  res.status(201).json({
    message: "User sucessfully signed up.",
  });
};

const signIn = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({
      message: "Invalid Credentials.",
    });
    return;
  }
  const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
  if (isValidPassword) {
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "10h",
      }
    );

    res.status(400).json({
      message: "Succesfully signed in.",
      token,
    });
    return;
  }

  res.status(400).json({
    message: "Invalid Credentials.",
  });
};
module.exports = {
  signIn,
  signUp,
};
