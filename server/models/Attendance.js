const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");

// Define Attendance model
const Attendance = sequelize.define("Attendance", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Present", "Absent"),
    allowNull: false,
  },

});

// Define associations
Attendance.belongsTo(Student, { foreignKey: "StudentId" });
Student.hasMany(Attendance, { foreignKey: "StudentId" });

module.exports = Attendance;
