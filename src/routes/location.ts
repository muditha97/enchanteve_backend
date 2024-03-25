import express from "express";
import { Product } from "../models/product";
import { Order } from "../models/order";
import { Province } from "../models/province";
import { District } from "../models/district";
import { City } from "../models/city";

const router = express.Router();

router.get("/province", async (req, res) => {
  try {
    const provinces = await Province.find({});

    return res.status(200).json(provinces);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/district", async (req, res) => {
  try {
    const districts = await District.find({});

    return res.status(200).json(districts);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/city", async (req, res) => {
  try {
    const cities = await City.find({});

    return res.status(200).json(cities);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/city/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cities = await City.find({ district_id: Number(id) });

    return res.status(200).json(cities);
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

export default router;
