const express = require("express");
const { Product } = require("../models");
const { Op } = require("sequelize");
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

// Auto-check and seed if no products exist
router.get("/", async (req, res, next) => {
  try {
    const productCount = await Product.count();
    if (productCount === 0) {
      console.log("No products found, auto-seeding...");
      await seedProducts();
    }
    next();
  } catch (error) {
    console.error("Auto-seed check failed:", error);
    next();
  }
});

// Seed function (same as your existing seed route)
const seedProducts = async () => {
  const products = [
    // Electronics
    {
      name: "iPhone 14 Pro",
      description:
        "Latest Apple smartphone with A16 Bionic chip and 48MP camera",
      price: 999,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1678652197950-462f0d6e0b6e?w=500",
      stock: 50,
    },
    {
      name: "Samsung Galaxy S23 Ultra",
      description: "Flagship Android phone with S Pen and 200MP camera",
      price: 1199,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
      stock: 30,
    },
    {
      name: 'MacBook Pro 14"',
      description: "M3 Pro chip, 18GB RAM, 512GB SSD - Professional laptop",
      price: 1999,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      stock: 20,
    },
    {
      name: "Sony WH-1000XM5",
      description: "Premium noise-canceling wireless headphones",
      price: 399,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
      stock: 75,
    },
    {
      name: "iPad Air",
      description: "10.9-inch Liquid Retina display, M1 chip, 256GB",
      price: 749,
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
      stock: 40,
    },
    {
      name: 'Dell UltraSharp 27" Monitor',
      description: "4K UHD monitor with USB-C connectivity",
      price: 549,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
      stock: 35,
    },

    // Fashion
    {
      name: "Nike Air Max 270",
      description: "Comfortable running shoes with Air cushioning",
      price: 150,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      stock: 100,
    },
    {
      name: "Levi's 501 Original Jeans",
      description: "Classic straight fit denim jeans",
      price: 89,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      stock: 120,
    },
    {
      name: "Adidas Ultraboost 23",
      description: "Premium running shoes with Boost technology",
      price: 180,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
      stock: 80,
    },
    {
      name: "Ray-Ban Aviator Sunglasses",
      description: "Classic aviator style with UV protection",
      price: 169,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      stock: 60,
    },
    {
      name: "North Face Fleece Jacket",
      description: "Warm and comfortable outdoor jacket",
      price: 129,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      stock: 45,
    },

    // Home & Living
    {
      name: "Dyson V15 Vacuum",
      description: "Cordless vacuum cleaner with laser dust detection",
      price: 649,
      category: "Home & Living",
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
      stock: 25,
    },
    {
      name: "Instant Pot Duo 7-in-1",
      description: "Multi-use pressure cooker, 6 quart",
      price: 99,
      category: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500",
      stock: 55,
    },
    {
      name: "KitchenAid Stand Mixer",
      description: "5-quart tilt-head stand mixer with 10 speeds",
      price: 379,
      category: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=500",
      stock: 30,
    },
    {
      name: "Casper Memory Foam Pillow",
      description: "Ergonomic pillow for perfect neck support",
      price: 89,
      category: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
      stock: 100,
    },

    // Books
    {
      name: "Atomic Habits by James Clear",
      description: "Bestselling book on building good habits",
      price: 16,
      category: "Books",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      stock: 200,
    },
    {
      name: "The Psychology of Money",
      description: "Morgan Housel's insights on wealth and happiness",
      price: 18,
      category: "Books",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500",
      stock: 150,
    },
    {
      name: "Project Hail Mary",
      description: "Andy Weir's thrilling science fiction novel",
      price: 15,
      category: "Books",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
      stock: 175,
    },

    // Sports & Fitness
    {
      name: "Bowflex Adjustable Dumbbells",
      description: "5-52.5 lbs adjustable weight dumbbells set",
      price: 349,
      category: "Sports & Fitness",
      image:
        "https://images.unsplash.com/photo-1517836477839-7072aaa8b121?w=500",
      stock: 40,
    },
    {
      name: "Yoga Mat Premium",
      description: "Non-slip 6mm thick exercise mat with carrying strap",
      price: 39,
      category: "Sports & Fitness",
      image:
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
      stock: 90,
    },
    {
      name: "Garmin Forerunner 255",
      description: "GPS running smartwatch with advanced training features",
      price: 449,
      category: "Sports & Fitness",
      image:
        "https://images.unsplash.com/photo-1523395243481-163f8f6155ab?w=500",
      stock: 35,
    },
    {
      name: "Resistance Bands Set",
      description: "5-piece resistance band set with handles and anchor",
      price: 29,
      category: "Sports & Fitness",
      image:
        "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500",
      stock: 120,
    },

    // Beauty & Personal Care
    {
      name: "Dyson Airwrap Styler",
      description: "Multi-styler with intelligent heat control",
      price: 599,
      category: "Beauty & Personal Care",
      image:
        "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500",
      stock: 20,
    },
    {
      name: "CeraVe Moisturizing Cream",
      description: "Daily facial and body moisturizer with hyaluronic acid",
      price: 19,
      category: "Beauty & Personal Care",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
      stock: 150,
    },
    {
      name: "Philips Electric Shaver",
      description: "Series 9000 wet and dry electric shaver",
      price: 279,
      category: "Beauty & Personal Care",
      image:
        "https://images.unsplash.com/photo-1621607003897-89419d3e3582?w=500",
      stock: 45,
    },

    // Toys & Games
    {
      name: "LEGO Star Wars Millennium Falcon",
      description: "Ultimate collector's edition building set, 7541 pieces",
      price: 849,
      category: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
      stock: 15,
    },
    {
      name: "Nintendo Switch OLED",
      description: "Gaming console with vibrant 7-inch OLED screen",
      price: 349,
      category: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500",
      stock: 50,
    },
    {
      name: "PlayStation 5",
      description: "Next-gen gaming console with 4K graphics",
      price: 499,
      category: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
      stock: 30,
    },
    {
      name: "Rubik's Cube 3x3",
      description: "Classic puzzle cube - original design",
      price: 12,
      category: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1591991731833-b4807cf7b1e7?w=500",
      stock: 200,
    },
  ];

  await Product.bulkCreate(products);
  console.log(`Auto-seeded ${products.length} products`);
};

// Keep the seed endpoint for manual triggering if needed
router.post("/seed", async (req, res) => {
  try {
    await seedProducts();
    res.json({ message: "Products seeded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
