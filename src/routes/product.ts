import express from "express";
import { Category } from "../models/category";
import { Product } from "../models/product";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.category) {
      return res.status(400).send({
        message: "Send required details",
      });
    }

    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      category: req.body.category,
      availableColors: req.body.availableColors,
      discount: req.body.discount,
    };

    const product = await Product.create(newProduct);

    return res.status(201).send(product);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId });

    return res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    return res.status(200).json(product);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Send required details",
      });
    }

    const { id } = req.params;

    const result = await Category.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id: ", id);

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
