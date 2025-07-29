const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING, 
    allowNull: false,
    unique: {
      name: 'unique_email',
      msg: 'Email already exists!',
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("Admin", "Teacher", "Doctor", "Employee"),
    allowNull: false,
  },
}, {
  tableName: "Users",
});

module.exports = User;
