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
      id: req.body.id,
      customerName: req.body.customerName,
      customerPhone1: req.body.customerPhone1,
      customerPhone2: req.body.customerPhone2,
      address: req.body.address,
      size: req.body.size,
      district: req.body.district,
      city: req.body.city,
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

    const ordersData = await Promise.all(
      orders
        .filter((order) => order.deletedAt === null) // Filter out orders where deletedAt is not null
        .map(async (order) => {
          return {
            _id: order._id,
            id: order.id,
            customerName: order.customerName,
            customerPhone1: order.customerPhone1,
            customerPhone2: order.customerPhone2,
            address: order.address,
            size: order.size,
            district: order.district,
            city: order.city,
            products: await Promise.all(
              order.products.map(async (product) => {
                return {
                  product: await Product.findById(product.productId),
                  quantity: product.quantity,
                };
              })
            ),
            total: order.total,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
          };
        })
    );

    return res.status(200).json({
      count: ordersData.length,
      data: ordersData,
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
