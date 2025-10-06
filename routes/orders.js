const express = require("express");
const { Order, Product } = require("../models");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Create order
router.post("/", auth, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    const order = await Order.create({
      userId: req.user.id,
      items: JSON.stringify(items),
      totalAmount,
      shippingAddress,
      status: "confirmed",
      paymentStatus: "completed", // For demo, we'll assume payment is completed
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get user orders
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    const ordersWithItems = orders.map((order) => ({
      ...order.toJSON(),
      items: JSON.parse(order.items),
    }));

    res.json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get order by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderWithItems = {
      ...order.toJSON(),
      items: JSON.parse(order.items),
    };

    res.json(orderWithItems);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
