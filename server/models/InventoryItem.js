const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const InventoryItem = sequelize.define("InventoryItem", {
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.ENUM("Available", "In Use", "Damaged", "Disposed"), defaultValue: "Available" },
  location: { type: DataTypes.STRING },
  assignedTo: { type: DataTypes.STRING }, // Optional: for tracking use
});

module.exports = InventoryItem;
