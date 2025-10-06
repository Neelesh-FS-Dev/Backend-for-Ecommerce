const express = require("express");
const { Product } = require("../models");
const { Op } = require("sequelize"); // Needed for `like` queries

const router = express.Router();

// Get all products with search and filter
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    let where = {};

    if (category && category !== "all") {
      where.category = category;
    }

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Seed sample products
router.post("/seed", async (req, res) => {
  try {
    const products = [
      {
        name: "iPhone 14",
        description: "Latest Apple smartphone",
        price: 999,
        category: "Electronics",
        image: "https://via.placeholder.com/150",
        stock: 50,
      },
      {
        name: "Samsung Galaxy S23",
        description: "Powerful Android phone",
        price: 899,
        category: "Electronics",
        image: "https://via.placeholder.com/150",
        stock: 30,
      },
      {
        name: "Nike Air Max",
        description: "Comfortable running shoes",
        price: 120,
        category: "Fashion",
        image: "https://via.placeholder.com/150",
        stock: 100,
      },
      {
        name: "MacBook Pro",
        description: "Professional laptop",
        price: 1999,
        category: "Electronics",
        image: "https://via.placeholder.com/150",
        stock: 20,
      },
    ];

    await Product.bulkCreate(products);
    res.json({ message: "Sample products added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
