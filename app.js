const express = require("express");
const app = express();
const port = 5500;
const connectDb = require("./config/db");
require("express-async-errors");
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/user.routes");
const catagoryRouter = require("./routes/catagory.routes");
app.use(express.json());

connectDb();

app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/catagories", catagoryRouter);

const errorHandling = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
};

app.use(errorHandling);

app.listen(port, () => {
  console.log(`Ecommerce app listening on port ${port}`);
});
