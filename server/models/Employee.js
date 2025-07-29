const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  position: { type: DataTypes.STRING, allowNull: false },
  salary: { type: DataTypes.FLOAT, allowNull: false },
  attendance: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Employee;
