const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User"); // ✅ Must import if not using associate/initModels pattern

const Appointment = sequelize.define("Appointment", {
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("Scheduled", "Completed", "Cancelled"),
    defaultValue: "Scheduled",
  },
});

// 🔁 Associate immediately to ensure it works
Appointment.belongsTo(User, {
  foreignKey: "doctorId",
  as: "Doctor",
});

module.exports = Appointment;
