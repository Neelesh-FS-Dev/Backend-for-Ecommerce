const express = require("express");
const sequelize = require("./config/database");

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = 3003;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello, World!"));
app.get("/about", (req, res) =>
  res.send("This is a simple Node.js server with routing.")
);
app.get("/contact", (req, res) =>
  res.send("Contact us at contact@example.com")
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 404 handler
app.use((req, res) => res.status(404).send("404 Not Found"));

// Database sync
sequelize
  .sync({ force: false })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Database sync error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
