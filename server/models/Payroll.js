// server/models/Payroll.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Payroll = sequelize.define("Payroll", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  datePaid: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.STRING,
  },
});

Payroll.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Payroll, { foreignKey: "userId" });

module.exports = Payroll;
