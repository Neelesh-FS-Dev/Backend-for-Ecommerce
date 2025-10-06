const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");

// Define relationships
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Product,
  Order,
};
