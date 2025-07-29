const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Client = sequelize.define("Client", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
});

module.exports = Client;
