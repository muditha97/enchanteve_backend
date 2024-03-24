import express from "express";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { OrderProductType } from "../types";
import { Order } from "../models/order";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.products || !req.body.total) {
      return res.status(400).send({
        message: "Send required details",
      });
    }

    const products = req.body.products.map((product: OrderProductType) => {
      return {
        productId: product.productId,
        quantity: product.quantity,
      };
    });

    const newOrder = {
      products: products,
      total: req.body.total,
    };

    const order = await Order.create(newOrder);

    return res.status(201).send(order);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({});

    return res.status(200).json({
      count: orders.length,
      data: orders,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    return res.status(200).json(order);
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

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.products || !req.body.total) {
      return res.status(400).send({
        message: "Send required details",
      });
    }

    const { id } = req.params;

    const order = await Order.findById(id);

    if (order?.deletedAt !== null) {
      return res.status(404).json({
        message: "Order Deleted",
      });
    }

    const result = await Order.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Order.findByIdAndUpdate(id, { deletedAt: new Date() });

    if (!result) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
