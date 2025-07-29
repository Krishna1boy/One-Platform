// models/Fee.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");

const Fee = sequelize.define("Fee", {
  amountPaid: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Fee.belongsTo(Student, { foreignKey: "studentId", as: "Student" });

module.exports = Fee;
