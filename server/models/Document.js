const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User"); // ✅ Safe here because we don't re-require Document

const Document = sequelize.define("Document", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
    defaultValue: "Pending",
  },
});

// ✅ Define both associations here (one-way safe)
Document.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Document, { foreignKey: "userId" });

module.exports = Document;
