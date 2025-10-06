const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  items: {
    type: DataTypes.TEXT, // JSON string
    allowNull: false,
  },
  shippingAddress: {
    type: DataTypes.TEXT,
  },
});

module.exports = Order;
