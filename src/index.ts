import express, { Application } from "express";
import mongoose from "mongoose";
require("dotenv").config();

import productRoute from "./routes/product";
import categoryRoute from "./routes/category";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(cors());

app.use("/category", categoryRoute);
app.use("/product", productRoute);

mongoose
  .connect("mongodb://127.0.0.1:27017/enchanteve")
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
