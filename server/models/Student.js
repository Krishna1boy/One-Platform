const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define("Student", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  grade: { type: DataTypes.STRING },
  section: { type: DataTypes.STRING },
});

module.exports = Student;
