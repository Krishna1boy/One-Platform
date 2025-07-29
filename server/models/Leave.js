const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Leave = sequelize.define("Leave", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fromDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  toDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
    defaultValue: "Pending",
  },
  // Sequelize will add `userId` automatically from the association
});

Leave.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Leave, { foreignKey: "userId" });

module.exports = Leave;
